import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ingredient, IngredientForm } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private readonly apiUrl = 'http://localhost:3000';  // Remplacez par l'URL de votre API

  constructor(private readonly http: HttpClient) { }

  getIngredients(id: number): Observable<IngredientForm[]> {
    return this.http.get<IngredientForm[]>(`${this.apiUrl}/ingredients/by-id/${id}`);
  }

  searchIngredients(searchTerm: string | null = ''): Observable<Ingredient[]> {
    // Vérifie si searchTerm est vide
    if (!searchTerm?.trim()) {
      // Si searchTerm est vide ou composé uniquement d'espaces, retourne un tableau vide
      return of([]);
    }

    return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredients/search`, { params: { search: searchTerm } });
  }
}