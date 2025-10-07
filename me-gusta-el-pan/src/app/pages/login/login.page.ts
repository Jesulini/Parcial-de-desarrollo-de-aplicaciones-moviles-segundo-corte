import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.email && this.password) {
      alert(`¡Bienvenido ${this.email}!`);
      // Aquí luego conectamos con Firebase, pero por ahora lo dejamos visual.
      this.router.navigate(['/home']);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
