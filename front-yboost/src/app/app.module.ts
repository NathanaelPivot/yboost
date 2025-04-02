import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailComponent } from './detail/detail.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { BasketService } from './services/basket.service';
import { CommandesComponent } from './commandes/commandes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CocktailFormComponent } from './cocktail-form/cocktail-form.component';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { IonicModule } from '@ionic/angular';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    DetailComponent,
    HeaderComponent,
    LoginComponent,
    BasketComponent,
    DashboardComponent,
    RegisterComponent,
    CommandesComponent,
    CocktailFormComponent,
    CocktailListComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    [BasketService]

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
