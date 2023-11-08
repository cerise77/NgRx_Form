import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import { RegisterRequestInterface } from "../types/registerRequest.interface"
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface"
import { Observable } from "rxjs"
import { map } from 'rxjs/operators';
import { AuthResponseInterface } from "../types/authResponse.interface"
import { environment } from "src/environments/environment.development"


@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private http: HttpClient){}

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface>{
        // const url = 'https://api.realworld.io/api/users'
        const url = environment.apiUrl + '/users';
        return this.http.post<AuthResponseInterface>(url, data)
        .pipe(map((response) => response.user))
    }
}