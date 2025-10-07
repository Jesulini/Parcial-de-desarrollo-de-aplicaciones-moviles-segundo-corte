import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {

  user = {
    name: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    country: '',
    city: '',
    gender: ''
  };

  constructor(private router: Router) {}

  registerUser() {
    console.log('Usuario registrado:', this.user);
    alert(`Bienvenido, ${this.user.name}! 🥖`);
    this.router.navigate(['/login']);
  }

}
