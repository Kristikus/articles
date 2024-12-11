import { inject, Injectable } from '@angular/core';
import { User } from '../views/register/register.component';
import { BehaviorSubject, Observable, skip, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../views/login/login.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient)
  private router: Router = inject(Router)

  private currentResponse: BehaviorSubject<AuthResponse| undefined> = new BehaviorSubject<AuthResponse | undefined>(undefined)

  get username() {
    return this.currentResponse.value?.user.username
  }

  get isLogged() {
    return !!this.currentResponse.value
  }

  get token() {
    return this.currentResponse.value?.accessToken
  }

  private readonly AUTH_KEY = ""

  constructor() {
    const auth = sessionStorage.getItem(this.AUTH_KEY)
    if(auth) {
      this.currentResponse.next(JSON.parse(auth))
    }
    this.currentResponse.pipe(skip(1)).subscribe(response => {
      if(response) {
        console.log("response in sessionStorage :", response)
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(response))
      }
      else {
        sessionStorage.clear()
        this.router.navigate(['/login'])
      }
    })
  }

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("/register", user)
  }

  login(credential: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("/login", credential)
    .pipe(
      tap(response => {
        console.log("response :", response)
        this.currentResponse.next(response)
      })
    )
  }

  logout(): void {
      this.currentResponse.next(undefined);
      console.log('Utilisateur déconnecté');
  }

}

export interface AuthResponse {
  user: User,
  accessToken: string
}
