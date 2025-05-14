import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service'; // Assurez-vous que le service Prisma est inclus

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule { }
