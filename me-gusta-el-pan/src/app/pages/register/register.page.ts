import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegisterPage {
  // Campos del formulario
  public name: string = '';
  public lastName: string = '';
  public birthDate: string = '';
  public email: string = '';
  public password: string = '';
  public country: string = '';
  public city: string = '';
  public gender: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      const user = await this.authService.register({
        name: this.name,
        lastName: this.lastName,
        birthDate: this.birthDate,
        email: this.email,
        password: this.password,
        country: this.country,
        city: this.city,
        gender: this.gender
      });

      console.log('✅ Usuario registrado:', user);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('❌ Error al registrar:', error);
      alert('Error al registrar: ' + (error as any).message);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
