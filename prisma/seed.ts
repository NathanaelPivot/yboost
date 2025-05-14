import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/prisma/prisma.service'; // Adaptez le chemin d'importation si nécessaire
import { Injectable } from '@nestjs/common';


const prisma = new PrismaClient();

@Injectable()
export class SeedService {
    constructor(private readonly prisma: PrismaClient) { }

    async seed() {
        // Insertion des ingrédients
        await this.prisma.ingredient.createMany({
            data: [
                { name: 'Menthe', stock: 100 },
                { name: 'Rhum', stock: 150 },
                { name: 'Sucre', stock: 100 },
                { name: 'Citron', stock: 50 },
                { name: 'Eau gazeuse', stock: 200 },
                { name: 'Cachaça', stock: 80 },
                { name: 'Citron vert', stock: 50 },
                { name: 'Tequila', stock: 70 },
                { name: 'Cointreau', stock: 60 },
                { name: 'Jus de citron vert', stock: 100 },
                { name: 'Lait de coco', stock: 50 },
                { name: 'Vodka', stock: 100 },
                { name: 'Jus de tomate', stock: 50 },
                { name: 'Sauce Worcestershire', stock: 30 },
                { name: 'Tabasco', stock: 20 },
                { name: 'Triple sec', stock: 50 },
                { name: 'Jus de cranberry', stock: 60 },
                { name: 'Jus d\'orange', stock: 80 },
                { name: 'Grenadine', stock: 40 },
                { name: 'Sirop d\'orgeat', stock: 30 },
                { name: 'Liqueur de pêche', stock: 25 },
                { name: 'Whiskey', stock: 90 },
                { name: 'Blanc d\'œuf', stock: 50 },
                { name: 'Gin', stock: 100 },
                { name: 'Tonic', stock: 120 },
                { name: 'Vin mousseux', stock: 70 },
                { name: 'Curaçao bleu', stock: 30 },
                { name: 'Campari', stock: 40 },
                { name: 'Vermouth rouge', stock: 50 },
                { name: 'Purée de pêche', stock: 25 },
                { name: 'Coca-Cola', stock: 150 },
                { name: 'Champagne', stock: 60 },
                { name: 'Pisco', stock: 40 },
                { name: 'Angostura bitters', stock: 20 },
                { name: 'Zeste d\'orange', stock: 10 },
                { name: 'Bourbon', stock: 80 },
                { name: 'Jus de pamplemousse', stock: 50 },
                { name: 'Soda', stock: 100 },
                { name: 'Sel', stock: 10 },
                { name: 'Cognac', stock: 50 },
                { name: 'Absinthe', stock: 30 },
                { name: 'Lillet blanc', stock: 20 },
                { name: 'Amaretto', stock: 30 },
                { name: 'Bière au gingembre', stock: 40 },
                { name: 'Jus d\'ananas', stock: 60 },
            ],
        });

        // Insertion des cocktails
        await this.prisma.cocktail.createMany({
            data: [
                { name: 'Mojito', price: 7.50, image: 'mojito.jpg' },
                { name: 'Caipirinha', price: 6.80, image: 'caipirinha.jpg' },
                { name: 'Margarita', price: 8.00, image: 'margarita.jpg' },
                { name: 'Piña Colada', price: 7.00, image: 'pina_colada.jpg' },
                { name: 'Daiquiri', price: 6.50, image: 'daiquiri.jpg' },
                { name: 'Bloody Mary', price: 7.20, image: 'bloody_mary.jpg' },
                { name: 'Cosmopolitan', price: 8.50, image: 'cosmopolitan.jpg' },
                { name: 'Tequila Sunrise', price: 7.90, image: 'tequila_sunrise.jpg' },
                { name: 'Mai Tai', price: 9.00, image: 'mai_tai.jpg' },
                { name: 'Sex on the Beach', price: 8.20, image: 'sex_on_the_beach.jpg' },
                { name: 'Whiskey Sour', price: 8.50, image: 'whiskey_sour.jpg' },
                { name: 'Gin Tonic', price: 6.90, image: 'gin_tonic.jpg' },
                { name: 'Tom Collins', price: 7.50, image: 'tom_collins.jpg' },
                { name: 'Aperol Spritz', price: 7.00, image: 'aperol_spritz.jpg' },
                { name: 'Blue Lagoon', price: 7.80, image: 'blue_lagoon.jpg' },
                { name: 'Negroni', price: 8.00, image: 'negroni.jpg' },
                { name: 'Bellini', price: 7.50, image: 'bellini.jpg' },
                { name: 'Cuba Libre', price: 6.80, image: 'cuba_libre.jpg' },
                { name: 'French 75', price: 9.50, image: 'french_75.jpg' },
                { name: 'Pisco Sour', price: 8.90, image: 'pisco_sour.jpg' },
                { name: 'Manhattan', price: 8.50, image: 'manhattan.jpg' },
                { name: 'Old Fashioned', price: 9.00, image: 'old_fashioned.jpg' },
                { name: 'Mint Julep', price: 7.80, image: 'mint_julep.jpg' },
                { name: 'Paloma', price: 7.50, image: 'paloma.jpg' },
                { name: 'Sazerac', price: 8.70, image: 'sazerac.jpg' },
                { name: 'Vesper Martini', price: 9.50, image: 'vesper_martini.jpg' },
                { name: 'Long Island Iced Tea', price: 10.00, image: 'long_island_iced_tea.jpg' },
                { name: 'Amaretto Sour', price: 7.20, image: 'amaretto_sour.jpg' },
                { name: 'Dark and Stormy', price: 8.00, image: 'dark_and_stormy.jpg' },
                { name: 'Rum Punch', price: 7.70, image: 'rum_punch.jpg' },
            ],
        });

        // Insertion des utilisateurs
        await this.prisma.user.create({
            data: {
                username: 'kantin',
                password: 'kantin',
            },
        });

        // Insertion des ingrédients des cocktails
        await this.prisma.cocktailIngredient.createMany({
            data: [
                { cocktail_id: 1, ingredient_id: 1, quantity: 10 },
                { cocktail_id: 1, ingredient_id: 2, quantity: 4 },
                { cocktail_id: 1, ingredient_id: 3, quantity: 2 },
                { cocktail_id: 1, ingredient_id: 7, quantity: 1 },
                { cocktail_id: 1, ingredient_id: 5, quantity: 10 },

                { cocktail_id: 2, ingredient_id: 6, quantity: 4 },
                { cocktail_id: 2, ingredient_id: 7, quantity: 1 },
                { cocktail_id: 2, ingredient_id: 3, quantity: 2 },

                { cocktail_id: 3, ingredient_id: 8, quantity: 4 },
                { cocktail_id: 3, ingredient_id: 9, quantity: 2 },
                { cocktail_id: 3, ingredient_id: 10, quantity: 2 },
                { cocktail_id: 3, ingredient_id: 41, quantity: 1 },

                { cocktail_id: 4, ingredient_id: 2, quantity: 4 },
                { cocktail_id: 4, ingredient_id: 11, quantity: 4 },
                { cocktail_id: 4, ingredient_id: 12, quantity: 8 },

                { cocktail_id: 5, ingredient_id: 2, quantity: 4 },
                { cocktail_id: 5, ingredient_id: 10, quantity: 2 },
                { cocktail_id: 5, ingredient_id: 3, quantity: 2 },

                { cocktail_id: 6, ingredient_id: 13, quantity: 4 },
                { cocktail_id: 6, ingredient_id: 14, quantity: 10 },
                { cocktail_id: 6, ingredient_id: 15, quantity: 2 },
                { cocktail_id: 6, ingredient_id: 16, quantity: 1 },
                { cocktail_id: 6, ingredient_id: 41, quantity: 1 },

                { cocktail_id: 7, ingredient_id: 13, quantity: 4 },
                { cocktail_id: 7, ingredient_id: 17, quantity: 2 },
                { cocktail_id: 7, ingredient_id: 18, quantity: 3 },
                { cocktail_id: 7, ingredient_id: 10, quantity: 2 },

                { cocktail_id: 8, ingredient_id: 8, quantity: 4 },
                { cocktail_id: 8, ingredient_id: 19, quantity: 10 },
                { cocktail_id: 8, ingredient_id: 20, quantity: 2 },

                { cocktail_id: 9, ingredient_id: 2, quantity: 4 },
                { cocktail_id: 9, ingredient_id: 20, quantity: 1 },
                { cocktail_id: 9, ingredient_id: 21, quantity: 2 },
                { cocktail_id: 9, ingredient_id: 3, quantity: 2 },
                { cocktail_id: 9, ingredient_id: 10, quantity: 2 },

                { cocktail_id: 10, ingredient_id: 13, quantity: 4 },
                { cocktail_id: 10, ingredient_id: 19, quantity: 4 },
                { cocktail_id: 10, ingredient_id: 22, quantity: 2 },
                { cocktail_id: 10, ingredient_id: 18, quantity: 3 },

                { cocktail_id: 11, ingredient_id: 23, quantity: 4 },
                { cocktail_id: 11, ingredient_id: 10, quantity: 2 },
                { cocktail_id: 11, ingredient_id: 3, quantity: 2 },
                { cocktail_id: 11, ingredient_id: 24, quantity: 1 },

                { cocktail_id: 12, ingredient_id: 25, quantity: 4 },
                { cocktail_id: 12, ingredient_id: 26, quantity: 10 },

                { cocktail_id: 13, ingredient_id: 25, quantity: 4 },
                { cocktail_id: 13, ingredient_id: 10, quantity: 2 },
                { cocktail_id: 13, ingredient_id: 3, quantity: 2 },
                { cocktail_id: 13, ingredient_id: 5, quantity: 8 },

                { cocktail_id: 14, ingredient_id: 27, quantity: 6 },
                { cocktail_id: 14, ingredient_id: 28, quantity: 4 },
                { cocktail_id: 14, ingredient_id: 19, quantity: 10 },

                { cocktail_id: 15, ingredient_id: 29, quantity: 4 },
                { cocktail_id: 15, ingredient_id: 19, quantity: 6 },
                { cocktail_id: 15, ingredient_id: 20, quantity: 2 },

                { cocktail_id: 16, ingredient_id: 30, quantity: 3 },
                { cocktail_id: 16, ingredient_id: 25, quantity: 4 },
                { cocktail_id: 16, ingredient_id: 31, quantity: 3 },

                { cocktail_id: 17, ingredient_id: 28, quantity: 6 },
                { cocktail_id: 17, ingredient_id: 32, quantity: 3 },

                { cocktail_id: 18, ingredient_id: 33, quantity: 6 },
                { cocktail_id: 18, ingredient_id: 19, quantity: 10 },

                { cocktail_id: 19, ingredient_id: 34, quantity: 4 },
                { cocktail_id: 19, ingredient_id: 10, quantity: 2 },
                { cocktail_id: 19, ingredient_id: 28, quantity: 6 },

                { cocktail_id: 20, ingredient_id: 35, quantity: 4 },
                { cocktail_id: 20, ingredient_id: 10, quantity: 2 },
                { cocktail_id: 20, ingredient_id: 3, quantity: 2 },
                { cocktail_id: 20, ingredient_id: 24, quantity: 1 },

                { cocktail_id: 21, ingredient_id: 23, quantity: 4 },
                { cocktail_id: 21, ingredient_id: 31, quantity: 2 },
                { cocktail_id: 21, ingredient_id: 28, quantity: 1 },

                { cocktail_id: 22, ingredient_id: 23, quantity: 4 },
                { cocktail_id: 22, ingredient_id: 3, quantity: 1 },
                { cocktail_id: 22, ingredient_id: 36, quantity: 1 },

                { cocktail_id: 23, ingredient_id: 23, quantity: 4 },
                { cocktail_id: 23, ingredient_id: 3, quantity: 1 },
                { cocktail_id: 23, ingredient_id: 1, quantity: 8 },

                { cocktail_id: 24, ingredient_id: 8, quantity: 4 },
                { cocktail_id: 24, ingredient_id: 19, quantity: 10 },
                { cocktail_id: 24, ingredient_id: 37, quantity: 4 },

                { cocktail_id: 25, ingredient_id: 23, quantity: 4 },
                { cocktail_id: 25, ingredient_id: 38, quantity: 1 },
                { cocktail_id: 25, ingredient_id: 3, quantity: 1 },
                { cocktail_id: 25, ingredient_id: 39, quantity: 1 },

                { cocktail_id: 26, ingredient_id: 25, quantity: 4 },
                { cocktail_id: 26, ingredient_id: 9, quantity: 2 },
                { cocktail_id: 26, ingredient_id: 40, quantity: 1 },

                { cocktail_id: 27, ingredient_id: 8, quantity: 4 },
                { cocktail_id: 27, ingredient_id: 2, quantity: 2 },
                { cocktail_id: 27, ingredient_id: 13, quantity: 2 },
                { cocktail_id: 27, ingredient_id: 25, quantity: 2 },
                { cocktail_id: 27, ingredient_id: 17, quantity: 2 },
                { cocktail_id: 27, ingredient_id: 19, quantity: 4 },

                { cocktail_id: 28, ingredient_id: 41, quantity: 4 },
                { cocktail_id: 28, ingredient_id: 10, quantity: 2 },
                { cocktail_id: 28, ingredient_id: 3, quantity: 2 },

                { cocktail_id: 29, ingredient_id: 2, quantity: 4 },
                { cocktail_id: 29, ingredient_id: 42, quantity: 10 },

                { cocktail_id: 30, ingredient_id: 2, quantity: 4 },
                { cocktail_id: 30, ingredient_id: 12, quantity: 4 },
                { cocktail_id: 30, ingredient_id: 20, quantity: 2 },
                { cocktail_id: 30, ingredient_id: 19, quantity: 4 },
            ],
        });

        await this.prisma.order.createMany({
            data: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
                { id: 10 },
            ],
        });

        await this.prisma.orderCocktail.createMany({
            data: [
                { orderId: 1, cocktailId: 1, quantity: 2 },
                { orderId: 1, cocktailId: 3, quantity: 1 },
                { orderId: 2, cocktailId: 5, quantity: 4 },
                { orderId: 2, cocktailId: 7, quantity: 2 },
                { orderId: 3, cocktailId: 2, quantity: 3 },
                { orderId: 3, cocktailId: 4, quantity: 1 },
                { orderId: 4, cocktailId: 6, quantity: 5 },
                { orderId: 4, cocktailId: 8, quantity: 2 },
                { orderId: 5, cocktailId: 9, quantity: 3 },
                { orderId: 5, cocktailId: 10, quantity: 4 },
                { orderId: 6, cocktailId: 11, quantity: 2 },
                { orderId: 6, cocktailId: 12, quantity: 1 },
                { orderId: 7, cocktailId: 13, quantity: 2 },
                { orderId: 7, cocktailId: 14, quantity: 3 },
                { orderId: 8, cocktailId: 15, quantity: 4 },
                { orderId: 8, cocktailId: 16, quantity: 2 },
                { orderId: 9, cocktailId: 17, quantity: 3 },
                { orderId: 9, cocktailId: 18, quantity: 1 },
                { orderId: 10, cocktailId: 19, quantity: 2 },
                { orderId: 10, cocktailId: 20, quantity: 3 },
            ],
        });


    }
}

const seed = new SeedService(prisma);
seed.seed().then(() => {
    console.log("Complete seeding !")
}).catch(err => {
    console.error(err);
    throw (err)
}).finally(async () => {
    await prisma.$disconnect();
})