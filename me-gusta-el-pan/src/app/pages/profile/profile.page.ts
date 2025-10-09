import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProfilePage implements OnInit {
  public name: string = '';
  public lastName: string = '';
  public birthDate: string = '';
  public email: string = '';
  public country: string = '';
  public city: string = '';
  public gender: string = '';

  // Lista de pasiones estilo Tinder
  public passions: string[] = [
    'Videojuegos', 'Viajes', 'Harry Potter', 'Deportes', 'Cine', 'Música', 'Libros',
    'Comida', 'Tecnología', 'Arte', 'Fotografía', 'Animales', 'Naturaleza', 'Fitness',
    'Series', 'Moda', 'Cultura', 'Baile', 'Idiomas', 'Meditación'
  ];

  // Pasiones seleccionadas por el usuario
  public selectedPassions: Set<string> = new Set();

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const profile = await this.authService.getUserProfile(user.uid);
    if (profile) {
      this.name = profile['name'] || '';
      this.lastName = profile['lastName'] || '';
      this.birthDate = profile['birthDate'] || '';
      this.email = profile['email'] || '';
      this.country = profile['country'] || '';
      this.city = profile['city'] || '';
      this.gender = profile['gender'] || '';
      this.selectedPassions = new Set(profile['passions'] || []);
    }
  }

  togglePassion(passion: string) {
    if (this.selectedPassions.has(passion)) {
      this.selectedPassions.delete(passion);
    } else {
      this.selectedPassions.add(passion);
    }
  }

  async saveProfile() {
    const user = await this.authService.getCurrentUser();
    if (!user) return;

    await this.authService.updateUserProfile(user.uid, {
      name: this.name,
      lastName: this.lastName,
      birthDate: this.birthDate,
      email: this.email,
      country: this.country,
      city: this.city,
      gender: this.gender,
      passions: Array.from(this.selectedPassions)
    });

    alert('✅ Perfil actualizado correctamente');
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
