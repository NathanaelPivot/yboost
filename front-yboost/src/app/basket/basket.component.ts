import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../services/basket.service';
import { Cocktail } from '../models/cocktail.model';
import { Router } from '@angular/router'; // Pour la redirection

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<Cocktail[]> = new Observable();

  constructor(
    private readonly basketService: BasketService,
    private readonly router: Router // Injecter le router pour la navigation
  ) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  // Fonction pour récupérer la quantité d'un cocktail dans le panier
  getQuantity(article: Cocktail): number {
    const basket = this.basketService.basketSubject.getValue();
    return basket.filter(item => item.name === article.name).length;
  }

  // Fonction pour enlever une seule instance d'un cocktail
  removeOneFromBasket(cocktail: Cocktail): void {
    this.basketService.removeOneCocktail(cocktail);
  }

  // Fonction pour rediriger vers la page de paiement
  goToPayment(): void {
    this.router.navigate(['/payment']);
  }
  
}
