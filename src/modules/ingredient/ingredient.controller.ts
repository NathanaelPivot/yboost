import { Controller, Get, Param, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get('by-id/:id')
  async getIngredientsByCocktailId(@Param('id') id: string) {
    const ingredients = await this.ingredientService.getIngredientsByCocktailId(Number(id));
    if (!ingredients.length) {
      throw new NotFoundException('Aucun ingrédient trouvé pour ce cocktail');
    }
    return ingredients;
  }

  @Get('search')
  async getAllIngredients(@Query('search') search: string) {
    if (!search) {
      throw new BadRequestException("Paramètre 'search' requis");
    }
    return this.ingredientService.getAllIngredients(search);
  }
}
