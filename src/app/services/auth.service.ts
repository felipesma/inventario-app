import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  authState,
} from '@angular/fire/auth';
import { setDoc, Firestore, doc, onSnapshot, Unsubscribe } from '@angular/fire/firestore';
import { User } from '../models/users.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as inventarioActions from '../inventario/inventario.actions';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userUnsubscribe!: Unsubscribe;
  private _user!: User;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {}

  get user() {
    return this._user;
  }

  async initAuthListener() {
    authState(this.auth).subscribe((fUser) => {
      if ( fUser ) {
        this.userUnsubscribe = onSnapshot(
          doc(this.firestore, `${fUser.uid}`, 'user'),
          (docUser: any) => {
            let data: any = docUser.data();
            let user = User.fromFirebase(data);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          },
          (err) => {
            console.log(err);
          }
        );
      }
      if (!fUser) {
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(authActions.unsetUser());
        this.store.dispatch(inventarioActions.unsetItems());
      }
    });
  }

  async createUser(name: string, email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const newUser = new User(user.uid, name, email);
    return await setDoc(doc(this.firestore, user.uid, 'user'), { ...newUser });
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  isAuth() {
    return authState(this.auth).pipe(map((fUser) => fUser !== null));
  }
}
