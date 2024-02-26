import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  private baseurl=environment.apiBaseUrl

  public getProduct():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseurl}/product`)
  }

public getProductByid(id:number):Observable<any>{
  return this.http.get<Product>(`${this.baseurl}/product/${id}`)
}

public createProduct(product:any):Observable<Product>{
  return this.http.post<Product>(`${this.baseurl}/product`,product);
}

public updateProduct(product:any,id:number):Observable<Product>{
  return this.http.patch<Product>(`${this.baseurl}/product/${id}`,product);
}

public deleteProduct(id:number):Observable<Product>{
  return this.http.delete<Product>(`${this.baseurl}/product/${id}`);
}
}
