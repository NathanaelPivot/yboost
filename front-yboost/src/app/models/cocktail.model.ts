import { Ingredient } from "./ingredient.model";

export class Cocktail {
  id: number;
  name: string;
  price: number; // Propriété optionnelle
  image: string;
  quantity: number;
  ingredients: Ingredient[];

  constructor(id: number, name: string, price: number, image: string, quantity: number, ingredients: Ingredient[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.quantity = quantity;
    this.ingredients = ingredients
  }
}