import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module'; // Import du module Auth
import { PrismaService } from './prisma/prisma.service';
import { CocktailsService } from './modules/cocktails/cocktails.service';
import { CocktailsController } from './modules/cocktails/cocktails.controller';
import { PrismaModule } from './prisma/prisma.module';
import { IngredientService } from './modules/ingredient/ingredient.service';
import { IngredientController } from './modules/ingredient/ingredient.controller';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrdersController } from './modules/orders/orders.controller';
import { OrdersService } from './modules/orders/orders.service';

@Module({
  imports: [AuthModule, PrismaModule, IngredientModule, OrdersModule],
  providers: [PrismaService, CocktailsService, IngredientService, OrdersService],
  controllers: [CocktailsController, IngredientController, OrdersController], // Ajoute AuthModule ici
})
export class AppModule { }
