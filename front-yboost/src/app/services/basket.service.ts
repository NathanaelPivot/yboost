import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cocktail } from '../models/cocktail.model'; 

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public basketSubject = new BehaviorSubject<Cocktail[]>([]);
  basket$ = this.basketSubject.asObservable();

  constructor() {}

  addToBasket(cocktail: Cocktail) {
    const currentBasket = this.basketSubject.value;
    this.basketSubject.next([...currentBasket, cocktail]);
  }

  getBasket() {
    return this.basketSubject.value;
  }
}
