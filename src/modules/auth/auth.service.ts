import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // service Prisma pour accéder à la DB
import * as bcrypt from 'bcryptjs'; // Pour le hashing des mots de passe
import * as jwt from 'jsonwebtoken'; // Pour la gestion des tokens

@Injectable()
export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'cocktail';

    constructor(private prisma: PrismaService) { }

    async login(username: string, password: string) {
        if (!username || !password) {
            throw new Error('Veuillez fournir un username et un password');
        }

        const user = await this.prisma.user.findUnique({
            where: { username },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            this.JWT_SECRET,
            { expiresIn: '1h' },
        );

        return { message: 'Authentification réussie', token };
    }

    async register(username: string, password: string) {
        if (!username || !password) {
            throw new Error('Veuillez fournir un username et un password');
        }

        const existingUser = await this.prisma.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            throw new Error('Nom d\'utilisateur déjà pris');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        return { message: 'Compte créé avec succès' };
    }
}
