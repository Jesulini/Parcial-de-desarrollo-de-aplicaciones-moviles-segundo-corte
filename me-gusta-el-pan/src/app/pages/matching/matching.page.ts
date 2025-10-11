import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserProfile } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.page.html',
  styleUrls: ['./matching.page.scss'],
  standalone: false,
})
export class MatchingPage implements OnInit {
  profiles: UserProfile[] = [];
  currentIndex = 0;
  originalProfiles: UserProfile[] = []; // para reiniciar
  matches: string[] = []; // uid de perfiles a los que ya di like

  constructor(private firebase: FirebaseService, private auth: AuthService) {}

  async ngOnInit() {
    const all = await this.firebase.getAllProfiles();
    const myId = this.auth.currentUserId;

    // Traemos los matches que ya hice
    this.matches = await this.firebase.getMyMatches(myId!); // debe devolver array de uids

    // Filtramos los perfiles que no sean yo y que no haya dado like
    this.profiles = all.filter(p => p.uid !== myId && !this.matches.includes(p.uid));
    this.originalProfiles = [...this.profiles]; // guardo copia para reiniciar
  }

  async onMatch(profile: UserProfile) {
    const myId = this.auth.currentUserId;
    await this.firebase.saveMatch(myId!, profile.uid);
    alert(`¡Match con ${profile.name}!`);

    // Guardar en matches locales
    this.matches.push(profile.uid);
    this.nextSlide();
  }

  nextSlide() {
    if (this.currentIndex < this.profiles.length - 1) {
      this.currentIndex++;
    } else {
      // Llegamos al final
      this.currentIndex = this.profiles.length; // índice fuera para mostrar mensaje final
    }
  }

  resetMatches() {
    // Vuelvo a cargar los perfiles que no les he dado like
    this.profiles = this.originalProfiles.filter(p => !this.matches.includes(p.uid));
    this.currentIndex = 0;
  }

  get hasMoreProfiles(): boolean {
    return this.currentIndex < this.profiles.length;
  }
}
