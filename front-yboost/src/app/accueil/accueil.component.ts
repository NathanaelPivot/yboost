import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {

  cocktails: Cocktail[] = [];
  public searchTerm: string = '';

  constructor(private readonly cocktailService: CocktailService, private readonly basketService: BasketService) { }

  ngOnInit(): void {
    this.cocktailService.getCocktails().subscribe((value: Cocktail[]) => { this.cocktails = value });
  }

  addToBasket(cocktail: Cocktail) {
    this.basketService.addToBasket(cocktail);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/error_image.jpg';
  }

  searchTeams(e: any) {
    this.searchTerm = e.detail.value;
  }
}
