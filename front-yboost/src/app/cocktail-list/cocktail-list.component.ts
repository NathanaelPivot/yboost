import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../services/cocktail.service';
import { Router } from '@angular/router';
import { Cocktail } from '../models/cocktail.model';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {
  cocktails: Cocktail[] = [];

  constructor(private cocktailService: CocktailService, private router: Router) { }

  ngOnInit(): void {
    this.loadCocktails();
  }

  loadCocktails(): void {
    this.cocktailService.getCocktails().subscribe(cocktails => {
      this.cocktails = cocktails;
    });
  }

  onDeleteCocktail(id: number): void {
    this.cocktailService.deleteCocktail(id).subscribe(() => {
      this.cocktails = this.cocktails.filter(cocktail => cocktail.id !== id);
    });
  }

  onEditCocktail(id: number): void {
    this.router.navigate(['/edit-cocktail', id]);
  }

  onAddCocktail(): void {
    this.router.navigate(['/add-cocktail']);
  }
}
