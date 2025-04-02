export class Ingredient {
  id: number;
  name: string;
  stock: number;

  constructor(id: number, name: string, stock: number) {
    this.id = id;
    this.name = name;
    this.stock = stock;
  }
}

export class IngredientForm {
  id: number;
  name: string;
  quantity: number;

  constructor(id: number, name: string, quantity: number) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
  }
}