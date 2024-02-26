import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseurl= environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
public getCategory():Observable<Category[]>{
  return this.http.get<Category[]>(`${this.baseurl}/category`)
}

public createCategory(category:any):Observable<Category>{
  return this.http.post<Category>(`${this.baseurl}/category`,category)
}
public updateCategory(category:any,id:number):Observable<Category>{
  return this.http.patch<Category>(`${this.baseurl}/category/${id}`,category)
}
public getCategoryByid(id:number):Observable<Category>{
  return this.http.get<Category>(`${this.baseurl}/category/${id}`);
}

public deleteCategory(id:number):Observable<Category>{
  return this.http.delete<Category>(`${this.baseurl}/category/${id}`)
}
}
