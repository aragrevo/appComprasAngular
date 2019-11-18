import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appCompras';
  ngOnInit() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyBum0OPdjqFDJhIRYdxSOeCmmXzqRsR-8Q',
      authDomain: 'comprasapp-1f507.firebaseapp.com',
      databaseURL: 'https://comprasapp-1f507.firebaseio.com',
      projectId: 'comprasapp-1f507',
      storageBucket: 'comprasapp-1f507.appspot.com',
      messagingSenderId: '1061546248193',
      appId: '1:1061546248193:web:ce4781280e964537519800',
      measurementId: 'G-9P0J3D9MSW'
    };

    firebase.initializeApp(firebaseConfig);
  }
}
