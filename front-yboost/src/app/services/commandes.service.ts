import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../models/commande.models';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  constructor() { }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl + "/orders");
  }

}
