import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, updateEmail, updatePassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  // 🔥 BehaviorSubject para emitir cambios de perfil en tiempo real
  public userProfile$ = new BehaviorSubject<any>(null);

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, async (user) => {
      this.currentUser = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        const profile = await this.getUserProfile(user.uid);
        this.userProfile$.next(profile);
      } else {
        localStorage.removeItem('user');
        this.userProfile$.next(null);
      }
    });
  }

  async register(data: any) {
    const { email, password, name, lastName, birthDate, country, city, gender } = data;
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(this.firestore, 'users', user.uid), {
      uid: user.uid,
      email,
      name,
      lastName,
      birthDate,
      country,
      city,
      gender,
      createdAt: new Date()
    });

    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    const profile = await this.getUserProfile(user.uid);
    this.userProfile$.next(profile);
    return user;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    const profile = await this.getUserProfile(user.uid);
    this.userProfile$.next(profile);
    return user;
  }

  async logout() {
    await signOut(this.auth);
    this.currentUser = null;
    localStorage.removeItem('user');
    this.userProfile$.next(null);
  }

  async getCurrentUser() {
    if (this.currentUser) return this.currentUser;
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      return this.currentUser;
    }
    return null;
  }

  async getUserProfile(uid: string) {
    const userRef = doc(this.firestore, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  }

  /**
   * ✅ Actualiza los datos del perfil en Firestore sin borrar campos existentes
   */
  async updateUserProfile(uid: string, data: any) {
    const userRef = doc(this.firestore, 'users', uid);
    await setDoc(userRef, data, { merge: true }); // merge: true actualiza sin borrar campos

    // 🔥 Emitimos el nuevo perfil en tiempo real
    const updatedProfile = await this.getUserProfile(uid);
    this.userProfile$.next(updatedProfile);
  }

  async updateAuthData(email?: string, password?: string, displayName?: string) {
    const user = this.currentUser;
    if (!user) throw new Error('No hay usuario logueado');

    if (email && user.email !== email) await updateEmail(user, email);
    if (password) await updatePassword(user, password);
    if (displayName) await updateProfile(user, { displayName });

    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
}
