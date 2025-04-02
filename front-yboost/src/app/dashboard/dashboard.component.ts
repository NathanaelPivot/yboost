import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CocktailService } from '../services/cocktail.service';
import { Router } from '@angular/router';
import { IngredientService } from '../services/ingredient.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public cocktailForm!: FormGroup;
  ingredientSuggestions: { [key: number]: Ingredient[] } = {};
  cocktailSuggestions: Cocktail[] = [];
  selectedCocktail: Cocktail | null = null; // Cocktail sélectionné
  searchTerm: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly cocktailService: CocktailService,
    private readonly ingredientService: IngredientService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.cocktailForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      ingredients: this.fb.array([])  // FormArray pour les ingrédients
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

    const index = this.ingredients.length;
    this.ingredientSuggestions[index] = this.ingredientSuggestions[index] || [];

    const nameControl = ingredientGroup.get('name');
    if (nameControl) {
      nameControl.valueChanges.pipe(
        debounceTime(300),
        switchMap(searchTerm => this.ingredientService.searchIngredients(searchTerm || ''))
      ).subscribe(suggestions => {
        this.ingredientSuggestions[index] = suggestions.slice(0, 5); // Limiter à 5 suggestions
      });
    }

    this.ingredients.push(ingredientGroup);
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
    delete this.ingredientSuggestions[index];
  }

  onIngredientSelect(index: number, suggestion: Ingredient): void {
    const nameControl = this.ingredients.at(index).get('name');
    if (nameControl) {
      nameControl.setValue(suggestion.name);
    }
    this.ingredientSuggestions[index] = [];
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

  // Recherche des cocktails et affichage des suggestions
  onSearchChange(): void {
    if (this.searchTerm) {
      this.cocktailService.searchCocktails(this.searchTerm).subscribe(suggestions => {
        this.cocktailSuggestions = suggestions.slice(0, 5); // Limiter à 5 suggestions
      });
    } else {
      this.cocktailSuggestions = [];
    }
  }

  // Sélection d'un cocktail et affichage de ses détails
  onCocktailSelect(cocktail: Cocktail): void {
    this.selectedCocktail = cocktail; // Afficher le cocktail sélectionné
    this.searchTerm = cocktail.name;  // Mettre la valeur de l'input au nom du cocktail sélectionné
    this.cocktailSuggestions = [];    // Cacher la liste des suggestions
  }

  // Supprimer un cocktail
  onDeleteCocktail(cocktailId: number): void {
    this.cocktailService.deleteCocktail(cocktailId).subscribe(response => {
      console.log('Cocktail supprimé', response);
      this.selectedCocktail = null; // Réinitialiser le cocktail sélectionné
      this.onSearchChange(); // Rafraîchir la recherche
    }, error => {
      console.error('Erreur lors de la suppression du cocktail', error);
    });
  }
}


