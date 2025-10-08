import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  userData: any = null;
  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.email = user.email!;
        this.firestore.collection('usuarios').doc(user.uid).valueChanges()
          .subscribe(data => {
            this.userData = data;
          });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  saveProfile() {
    this.afAuth.currentUser.then(user => {
      if (user && this.userData) {
        this.firestore.collection('usuarios').doc(user.uid).update(this.userData)
          .then(() => alert('Perfil actualizado ✅'))
          .catch(err => alert('Error al guardar perfil: ' + err.message));
      }
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
