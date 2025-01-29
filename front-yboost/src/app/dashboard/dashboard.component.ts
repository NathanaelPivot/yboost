import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CocktailService } from '../services/cocktail.service'; // Service pour gérer les appels API
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public cocktailForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cocktailService: CocktailService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.cocktailForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      ingredients: this.fb.array([]) // FormArray pour les ingrédients
    });
  }

  get ingredients(): FormArray {
    return this.cocktailForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    const ingredientGroup = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    this.ingredients.push(ingredientGroup);
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onSubmit(): void {
    if (this.cocktailForm.valid) {
      const cocktailData = this.cocktailForm.value;
      this.cocktailService.addCocktail(cocktailData).subscribe(
        response => {
          console.log('Cocktail ajouté', response);
          this.router.navigate(['/']);
        },
        error => {
          console.error('Erreur lors de l\'ajout du cocktail', error);
        }
      );
    } else {
      console.log('Le formulaire est invalide');
    }
  }
}
