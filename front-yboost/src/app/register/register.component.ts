import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.successMessage = 'Inscription réussie, vous pouvez vous connecter !';
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erreur d\'inscription', err);
        this.errorMessage = 'Une erreur est survenue lors de l\'inscription';
        this.successMessage = '';
      }
    });
  }
}
