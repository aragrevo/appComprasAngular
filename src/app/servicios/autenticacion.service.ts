import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  regitroUsuario(userdata) {
    firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password).catch(error => console.log(error.message));
  }

  inicioSesion(userdata) {
    firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password)
      .then(response => {
        console.log(response);
        this.router.navigate(['/inicio']);
      })
      .catch(error => console.log(error));
  }

  isAuthenticated() {
    const user = firebase.auth().currentUser;
    return user ? true : false;
  }

  logout() {
    firebase.auth().signOut();
  }
}
