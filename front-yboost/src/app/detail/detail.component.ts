import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';
import { IngredientService } from '../services/ingredient.service';
import { CocktailService } from '../services/cocktail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{
  
  cocktail!: Cocktail 
  ingredients!: Ingredient[]
  intId!: number
  
  cocktailId: string | null = null;

  constructor(private readonly ingredientService: IngredientService, 
    private readonly cocktailService: CocktailService, 
    private readonly route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.cocktailId = this.route.snapshot.paramMap.get('id');
    this.getCocktailDetail(this.cocktailId)
    
  }

  getCocktailDetail(id: string | null){
    if(id){
      this.intId = parseInt(id, 10);
    }
    this.cocktailService.getCocktail(this.intId).subscribe((value: Cocktail)=>{
      this.cocktail = value
    });
    this.ingredientService.getIngredients(this.intId).subscribe((value : Ingredient[] )=> {
      this.ingredients = value
    });
  }
}
