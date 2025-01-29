import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private readonly apiUrl = 'http://localhost:3000';  // Remplacez par l'URL de votre API

  constructor(private readonly http: HttpClient) {}

  getIngredients(id: number): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl + `/ingredients/${id}` );
  }
}