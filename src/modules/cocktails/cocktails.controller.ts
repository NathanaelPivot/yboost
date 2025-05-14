import { Controller, Get, Param, Post, Body, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('cocktails')
export class CocktailsController {
    constructor(private readonly cocktailsService: CocktailsService) { }

    @Get()
    async getAllCocktails() {
        return this.cocktailsService.getAllCocktails();
    }

    @Get(':id')
    async getCocktailById(@Param('id') id: string) {
        const intId = parseInt(id, 10);
        return this.cocktailsService.getCocktailById(intId);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
      storage: diskStorage({
        destination: './assets/images', // Assurez-vous que ce dossier existe
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtName}`;
          callback(null, fileName);
        }
      })
    }))
    async createCocktail(
      @UploadedFile() file: Express.Multer.File,
      @Body() createCocktailDto: { 
        name: string; 
        price: number; 
        image?: string; 
        ingredients: { name: string; quantity: number }[] 
      }
    ) {
      if (file && file.filename) {
        createCocktailDto.image = file.filename;
      }
      return this.cocktailsService.createCocktail(createCocktailDto);
    }

    @Delete(':id')
    async deleteCocktail(@Param('id') id: string) {
        const intId = parseInt(id, 10);
        return this.cocktailsService.deleteCocktail(intId);
    }

    // Pour éviter un conflit avec getCocktailById, on utilise ici la route /cocktails/edit/:id
    @Get('edit/:id')
    async getCocktailForEdit(@Param('id') id: number) {
        return this.cocktailsService.getCocktailForEdit(id);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './assets/images',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExtName = extname(file.originalname);
                const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtName}`;
                callback(null, fileName);
            }
        })
    }))
    async updateCocktail(
        @Param('id') id: number,
        @UploadedFile() file: Express.Multer.File
,
        @Body() data: any
    ) {
        if (file && file.filename) {
            data.image = file.filename;
        }
        return this.cocktailsService.updateCocktail(id, data);
    }

    @Get('search/:term')
    async searchCocktails(@Param('term') term: string) {
        return this.cocktailsService.searchCocktail(term);
    }
}
