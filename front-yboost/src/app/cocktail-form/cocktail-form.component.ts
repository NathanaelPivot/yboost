import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from '../services/cocktail.service';
import { IngredientService } from '../services/ingredient.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IngredientForm } from '../models/ingredient.model';

@Component({
  selector: 'app-cocktail-form',
  templateUrl: './cocktail-form.component.html',
  styleUrls: ['./cocktail-form.component.scss']
})
export class CocktailFormComponent implements OnInit {
  cocktailForm!: FormGroup;
  ingredientSuggestions: { [key: number]: any[] } = {}; // Suggestions pour chaque ingrédient
  cocktailId: number | null = null; // Pour savoir si on est en modification ou ajout
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private cocktailService: CocktailService,
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cocktailForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [''], // sans Validators.required
      ingredients: this.fb.array([])
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cocktailId = +id;
        this.loadCocktail(this.cocktailId);
      }
    });
  }

  get ingredients(): FormArray {
    return this.cocktailForm.get('ingredients') as FormArray;
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      this.selectedFile = fileInput.files[0];
      this.cocktailForm.get('image')?.setValue(this.selectedFile.name);
    }
  }

  addIngredient(ingredient?: IngredientForm): void {
    const ingredientGroup = this.fb.group({
      name: [ingredient ? ingredient.name : '', Validators.required],
      quantity: [ingredient ? ingredient.quantity : '', Validators.required],
    });
    const index = this.ingredients.length;
    this.ingredientSuggestions[index] = [];

    this.ingredients.push(ingredientGroup);
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
    delete this.ingredientSuggestions[index];
  }

  loadCocktail(cocktailId: number): void {
    this.cocktailService.getCocktail(cocktailId).subscribe(cocktail => {
      this.cocktailForm.patchValue({
        name: cocktail.name,
        price: cocktail.price,
        image: cocktail.image
      });

      this.ingredientService.getIngredients(cocktailId).subscribe(ingredients => {
        if (ingredients && Array.isArray(ingredients)) {
          ingredients.forEach(ingredient => {
            this.addIngredient(ingredient);
          });
        }
      });

    });
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.cocktailForm.valid) {
      // Création d'un objet FormData afin d'envoyer les données et le fichier image
      const formData = new FormData();

      // Ajout des champs textuels
      formData.append('name', this.cocktailForm.get('name')?.value);
      formData.append('price', this.cocktailForm.get('price')?.value);

      // Si vous avez d'autres champs (par exemple, ingredients), vous pouvez les ajouter.
      // Par exemple, si 'ingredients' est un tableau d'objets, on peut l'envoyer en JSON :
      if (this.cocktailForm.get('ingredients')) {
        formData.append('ingredients', JSON.stringify(this.cocktailForm.get('ingredients')?.value));
      }

      // Ajout du fichier image s'il a été sélectionné
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // Envoi via le service, en distinguant la création et la mise à jour
      if (this.cocktailId) {
        this.cocktailService.updateCocktail(this.cocktailId, formData).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.cocktailService.addCocktail(formData).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }

}
