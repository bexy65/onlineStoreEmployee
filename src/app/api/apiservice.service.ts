import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { dataModal } from '../home/dataModal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  userApi: string = environment.userApi;
  updateApi: string = environment.updateApi;

  getUser() : Observable<any> {
    return this.http.get(this.userApi);
  }

  addUser(data: any):Observable<any> {
    return this.http.post(this.userApi, data);
  }

  deleteUser(id:number) : Observable<any> {
    return this.http.delete(`${this.userApi}/${id}`);
  }

  fetchUserData(id:number) : Observable<any> {
    return this.http.get(`${this.userApi}/${id}`);
  }

  updateUser (data:dataModal, id:number) : Observable<any> {
    return this.http.put(`${this.updateApi}/${id}`, data);
  }

}