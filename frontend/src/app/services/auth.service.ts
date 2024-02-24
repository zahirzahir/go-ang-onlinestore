import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl=environment.apiBaseUrl;

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {

    return this.http.post<any>(`${this.apiServerUrl}/login`,{ email, password })
      // .pipe(
      //   tap(response => {
      //     if (response.token) {
      //       localStorage.setItem('access_token', response.token);
      //     }
      //   })
      // );
  }

  isLoggedIn():boolean {
   return localStorage.getItem('access_token') !=null;
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  getUserRole():string {
    const token = localStorage.getItem('access_token');
    const decodedToken = this.jwtHelper.decodeToken(token!)
    return decodedToken ? decodedToken.role : null;
  }
}
