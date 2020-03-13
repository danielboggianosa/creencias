import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = {headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer '+localStorage.getItem('token'))};
  api_url

  constructor(private api:ServerService, private http:HttpClient) {
    this.api_url = api.API_URI+'users';
  }

  getUsers(body){
    return this.http.post(this.api_url+'/get',body, this.headers)
  }

  getFiltered(body){
    return this.http.post(this.api_url+'/filtered',body, this.headers)
  }

  deleteUser(id){
    return this.http.delete(this.api_url+'/'+id, this.headers);
  }

}
