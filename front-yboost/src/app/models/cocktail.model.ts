import { Ingredient } from "./ingredient.model";

export class Cocktail {
    id: number;
    name: string;
    price: number; // Propriété optionnelle
    image: string;
    ingredients: Ingredient[];
  
    constructor(id: number, name: string,  price: number, image: string, ingredients: Ingredient[]) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.image = image;
      this.ingredients = ingredients
    }
  }