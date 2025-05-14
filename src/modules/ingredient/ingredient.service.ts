import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class IngredientService {
    constructor(private prisma: PrismaService) { }


    async getIngredientsByCocktailId(id: number) {
        const cocktailIngredients = await this.prisma.cocktailIngredient.findMany({
            where: {
                cocktail_id: id,
            },
            select: {
                ingredient: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                quantity: true,
            },
        });

        return cocktailIngredients.map(ci => ({
            ...ci.ingredient,
            quantity: ci.quantity,
        }));
    }

    async getAllIngredients(search: string) {
        return this.prisma.ingredient.findMany({
            where: {
                name: {
                    contains: search, // Sans `mode`
                },
            },
        });
    }
}
