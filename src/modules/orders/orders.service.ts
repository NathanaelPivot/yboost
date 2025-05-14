import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) { }

    // Récupérer toutes les commandes avec les cocktails associés
    async getAllOrders() {
        return this.prisma.order.findMany({
            include: {
                cocktails: {
                    include: { cocktail: true },
                },
            },
        });
    }

    // Récupérer une commande spécifique
    async getOrderById(id: number) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                cocktails: {
                    include: { cocktail: true },
                },
            },
        });
    }

    // Créer une nouvelle commande
    async createOrder(data: { cocktails: { cocktailId: number; quantity: number }[] }) {
        return this.prisma.order.create({
            data: {
                cocktails: {
                    create: data.cocktails.map(c => ({
                        cocktailId: c.cocktailId,
                        quantity: c.quantity,
                    })),
                },
            },
            include: { cocktails: { include: { cocktail: true } } },
        });
    }

    // Modifier une commande (cocktails et quantités)
    async updateOrder(id: number, data: { cocktails?: any }) {
        if (!data.cocktails || !Array.isArray(data.cocktails)) {
            throw new Error("Cocktails est requis et doit être un tableau.");
        }
        return this.prisma.order.update({
            where: { id },
            data: {
                cocktails: {
                    deleteMany: {}, // Supprime tous les cocktails liés avant de les recréer
                    create: data.cocktails.map(c => ({
                        cocktailId: c.cocktailId,
                        quantity: c.quantity,
                    })),
                },
            },
            include: { cocktails: { include: { cocktail: true } } },
        });
    }

    // Supprimer une commande
    async deleteOrder(id: number) {
        return this.prisma.order.delete({ where: { id } });
    }
}