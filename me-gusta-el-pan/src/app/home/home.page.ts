import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  profile: any = null;
  private profileSub: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    // 🔥 Suscribirse a cambios del perfil en tiempo real
    this.profileSub = this.authService.userProfile$.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnDestroy() {
    if (this.profileSub) this.profileSub.unsubscribe();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }
}
