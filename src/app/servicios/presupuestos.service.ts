import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
// tslint:disable-next-line: import-blacklist
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  presURL = 'https://comprasapp-1f507.firebaseio.com/presupuestos.json';

  constructor(private http: HttpClient) { }

  postPresupuesto(presupuesto: any) {
    const newpres = JSON.stringify(presupuesto);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.presURL, newpres, { headers }).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
}
