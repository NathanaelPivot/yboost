import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged: boolean = false;
  private authStatusSubscription!: Subscription;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authStatusSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLogged = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
  }

  updateStatus() {
    this.isLogged = this.authService.isAuthenticated();
  }
}
