import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'jquery';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public getUser(): Observable<User[]>{
  return  this.http.get<User[]>(`${this.apiServerUrl}/user`);

  }
  public addUser(user:any):Observable<User>{
   return this.http.post<User>(`${this.apiServerUrl}/signup`, user);
  }
  public updateUser(ID:Number,user:any):Observable<User>{
    return this.http.patch<User>(`${this.apiServerUrl}/user/${ID}`,user);
   }
   public deleteUser(ID:Number):any{
    return this.http.delete<User>(`${this.apiServerUrl}/user/${ID}`)
   }
   public getUserById(ID:Number):Observable<User>{
     return this.http.get<User>(`${this.apiServerUrl}/user/${ID}`);

   }
}
