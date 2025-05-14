import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CocktailsService {
    constructor(private readonly prisma: PrismaService) { }

    // Méthode pour upserter les ingrédients d'un cocktail
    async upsertCocktailIngredients(cocktailId: number, ingredients: any[]) {
        const upsertPromises = ingredients.map(async (ingredient) => {
            return this.prisma.cocktailIngredient.upsert({
                where: {
                    cocktail_id_ingredient_id: {
                        cocktail_id: cocktailId,
                        ingredient_id: ingredient.id,
                    },
                },
                update: {
                    quantity: ingredient.quantity,  // Met à jour la quantité de l'ingrédient
                },
                create: ingredient.createData
                    ? ingredient.createData
                    : ({} as Prisma.CocktailIngredientCreateInput),  // Utiliser le bon type pour la création
            });
        });

        // Attendre que toutes les promesses soient résolues
        return Promise.all(upsertPromises);
    }

    async createCocktail(data: any) {
        // Vérifier et parser le champ ingredients s'il s'agit d'une chaîne
        if (data.ingredients && typeof data.ingredients === 'string') {
            try {
                data.ingredients = JSON.parse(data.ingredients);
            } catch (error) {
                throw new Error('Données invalides : format des ingredients incorrect');
            }
        }

        // Vérifier que les champs obligatoires sont présents (adapter selon vos besoins)
        if (!data.name || !data.price || !data.image) {
            throw new Error('Données invalides : name, price et image sont requis');
        }

        // Vous pouvez ajouter d'autres validations sur data.ingredients si nécessaire
        if (!Array.isArray(data.ingredients)) {
            throw new Error('Données invalides : ingredients doit être un tableau');
        }

        // Suite de la création du cocktail (par exemple, insertion en base de données)
        const cocktail = await this.prisma.cocktail.create({
            data: {
                name: data.name,
                price: data.price,
                image: data.image,
                // Vous devez aussi traiter l'association avec les ingrédients, par exemple :
                ingredients: {
                    create: await Promise.all(
                        data.ingredients.map(async (ingredient: any) => {
                            // Vérifier la présence des données attendues dans ingredient
                            if (!ingredient.name || !ingredient.quantity) {
                                throw new Error('Données invalides : chaque ingredient doit avoir un nom et une quantité');
                            }
                            // Ici, vous pouvez vérifier/créer l'ingrédient en base
                            let ingredientRecord = await this.prisma.ingredient.findUnique({
                                where: { name: ingredient.name },
                                select: { id: true },
                            });
                            if (!ingredientRecord) {
                                ingredientRecord = await this.prisma.ingredient.create({
                                    data: {
                                        name: ingredient.name,
                                        stock: 0
                                    },
                                    select: { id: true },
                                });
                            }
                            return {
                                ingredient_id: ingredientRecord.id,
                                quantity: ingredient.quantity,
                            };
                        })
                    )
                }
            }
        });

        return cocktail;
    }


    async getCocktailForEdit(id: number) {
        const cocktail = await this.prisma.cocktail.findUnique({
            where: { id },
            include: {
                ingredients: {
                    select: {
                        ingredient: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                        quantity: true,
                    },
                },
            },
        });
        return cocktail;
    }

    async updateCocktail(id: number, data: any) {
        let { name, price, image, ingredients } = data;

        if (typeof id !== 'number') {
            id = parseInt(id, 10);
        }
        if (typeof ingredients === 'string') {
            ingredients = JSON.parse(ingredients);
        }
        console.log('Type de ingredients:', typeof ingredients);
        console.log('Ingredients:', ingredients);
        if (!Array.isArray(ingredients)) {
            throw new Error("Ingredients doit être un tableau.");
        }



        // 1. Fusionner les ingrédients qui se répètent (même nom)
        const dedupedIngredients = ingredients.reduce((acc: { [key: string]: any }, ingredient: any) => {
            if (acc[ingredient.name]) {
                // Somme des quantités si l'ingrédient existe déjà
                acc[ingredient.name].quantity += ingredient.quantity;
            } else {
                acc[ingredient.name] = { name: ingredient.name, quantity: ingredient.quantity };
            }
            return acc;
        }, {});

        const mergedIngredients = Object.values(dedupedIngredients);

        // 2. Vérifier/créer chaque ingrédient et récupérer son id
        const ingredientsWithIds = await Promise.all(
            mergedIngredients.map(async (ingredient: any) => {
                let ingredientRecord = await this.prisma.ingredient.findUnique({
                    where: { name: ingredient.name },
                    select: { id: true },
                });

                // Si l'ingrédient n'existe pas, le créer en fournissant 'stock'
                if (!ingredientRecord) {
                    ingredientRecord = await this.prisma.ingredient.create({
                        data: {
                            name: ingredient.name,
                            stock: 0  // ou toute autre valeur par défaut souhaitée
                        },
                        select: { id: true },
                    });
                }

                return {
                    ingredient_id: ingredientRecord.id,
                    quantity: ingredient.quantity, // La quantité totale issue de la fusion
                };
            })
        );

        // 3. Mettre à jour le cocktail en supprimant les anciens liens d'ingrédients puis en créant les nouveaux
        const updatedCocktail = await this.prisma.cocktail.update({
            where: { id },
            data: {
                name,
                price,
                image,
                ingredients: {
                    deleteMany: { cocktail_id: id }, // Supprime les anciens enregistrements dans la table de jointure
                    create: ingredientsWithIds,       // Crée les nouveaux enregistrements avec les IDs et quantités
                },
            },
        });

        return updatedCocktail;
    }

    async deleteCocktail(id: number) {
        return this.prisma.cocktail.delete({
            where: { id: id },
        });
    }

    async getAllCocktails() {
        return this.prisma.cocktail.findMany({
            include: {
                ingredients: true, // Inclut les ingrédients associés
            },
        });
    }

    // Méthode pour récupérer un cocktail par son ID
    async getCocktailById(id: number) {

        return this.prisma.cocktail.findUnique({
            where: { id: id },
            include: {
                ingredients: true, // Inclut les ingrédients associés
            },
        });
    }

    // Méthode pour rechercher des cocktails par un terme
    async searchCocktail(term: string) {
        return this.prisma.cocktail.findMany({
            where: {
                name: {
                    contains: term.toLowerCase(), // Convertit le terme recherché en minuscule
                    // Notez qu'il n'y a pas de "mode" ici
                },
            },
            include: {
                ingredients: true, // Inclut les ingrédients associés
            },
        });
    }
}
