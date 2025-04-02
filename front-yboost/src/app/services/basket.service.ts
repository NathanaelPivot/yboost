import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public basketSubject = new BehaviorSubject<Cocktail[]>([]);
  basket$ = this.basketSubject.asObservable();

  constructor() { }

  addToBasket(cocktail: Cocktail) {
    const currentBasket = this.basketSubject.value;
    this.basketSubject.next([...currentBasket, cocktail]);
  }

  removeOneCocktail(cocktail: Cocktail): void {
    const currentBasket = this.basketSubject.getValue();
    const index = currentBasket.findIndex(item => item.name === cocktail.name);

    if (index > -1) {
      currentBasket.splice(index, 1);
      this.basketSubject.next([...currentBasket]);
    }
  }

  removeCocktail(cocktail: Cocktail): void {
    const currentBasket = this.basketSubject.getValue();
    const filteredBasket = currentBasket.filter(item => item.name !== cocktail.name);
    this.basketSubject.next(filteredBasket);
  }

  getBasket() {
    return this.basketSubject.value;
  }
}
