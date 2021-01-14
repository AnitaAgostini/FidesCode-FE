import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utente } from 'src/app/_model/utente';
import { environment } from 'src/environments/environment';
//import { Observable } from 'rxjs/Observable';

@Injectable({ providedIn: 'root' })

// CHIAMATE REST

export class UserService {
    [x: string]: any;
    constructor(private http: HttpClient) {
    //  this.userUrl = 'http://localhost:4200/';
    }

    getAllUsers() {
        return this.http.get<Utente[]>(`${environment.apiUrl}/api/`);
    }

    getUserById(id: number) {
        return this.http.get<Utente>(`${environment.apiUrl}/api/${id}`);
    }

    register(user: Utente) {
        return this.http.post(`${environment.apiUrl}/api/newUser`, user);

    }


}
