import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  userApi: string = environment.userApi;

  // addUser(data: any):Observable<any> {
  //   return this.http.post(this.userApi, data);
  // }

  getUser() : Observable<any> {
    return this.http.get(this.userApi);
  }
}