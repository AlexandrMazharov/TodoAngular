import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {
    if (authService.isLoggedIn) this.router.navigate(['todo']);
  }

  ngOnInit(): void {}
}
