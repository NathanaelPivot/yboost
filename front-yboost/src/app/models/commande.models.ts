import { Cocktail } from "./cocktail.model";

export class Commande {
  id: number;
  cocktails: any[];

  constructor(id: number, cocktails: Cocktail[]) {
    this.id = id;
    this.cocktails = cocktails
  }
}
