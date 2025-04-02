import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';
import { RegisterComponent } from './register/register.component';
import { CommandesComponent } from './commandes/commandes.component';
import { CocktailFormComponent } from './cocktail-form/cocktail-form.component';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: 'panier', component: BasketComponent },

  { path: 'dashboard', component: CocktailListComponent },
  { path: 'add-cocktail', component: CocktailFormComponent },
  { path: 'edit-cocktail/:id', component: CocktailFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
export class AppRoutingModule { }
