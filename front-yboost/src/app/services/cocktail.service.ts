import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root',
})

export class CocktailService {
  private readonly apiUrl = 'http://localhost:3000';  // Remplacez par l'URL de votre API

  constructor(private readonly http: HttpClient) { }

  getCocktails(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(this.apiUrl + "/cocktails");
  }

  getCocktail(id: number): Observable<Cocktail> {
    return this.http.get<Cocktail>(`${this.apiUrl}/cocktails/${id}`);
  }

  // Mettre à jour un cocktail
  updateCocktail(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cocktails/${id}`, data);
  }
  
  addCocktail(cocktailData: any): Observable<any> {
    return this.http.post(this.apiUrl + "/cocktails", cocktailData);
  }

  searchCocktails(term: string): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(`${this.apiUrl}/cocktails/search/${term}`);
  }

  deleteCocktail(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cocktails/${id}`);
  }

}