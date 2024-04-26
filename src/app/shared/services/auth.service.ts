import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = this.auth.user;

  constructor(private auth: AngularFireAuth) { }

  async login(email: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    return await this.auth.signOut();
  }
}
