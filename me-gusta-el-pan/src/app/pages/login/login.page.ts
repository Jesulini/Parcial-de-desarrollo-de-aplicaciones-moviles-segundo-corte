import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    const user = await this.authService.login(this.email, this.password);
    if (user) {
      console.log('✅ Usuario logueado:', user);
      this.router.navigate(['/home']);
    } else {
      console.log('❌ Credenciales incorrectas');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
