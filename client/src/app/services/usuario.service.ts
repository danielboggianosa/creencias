import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerService } from './server.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = {headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer '+localStorage.getItem('token'))};
  api_url

  constructor(private api:ServerService, private http:HttpClient, private auth:AuthService) {
    this.api_url = api.API_URI+'usuario/';
  }

  getUsers(body){
    if(this.auth.isTokenValid())
      return this.http.post(this.api_url+'get',body, this.headers)
  }

  getFiltered(body){
    if(this.auth.isTokenValid())
    return this.http.post(this.api_url+'filtered',body, this.headers)
  }

  deleteUser(id){
    if(this.auth.isTokenValid())
    return this.http.delete(this.api_url+id, this.headers);
  }

  actualizar(id,usuario){
    if(this.auth.isTokenValid())
    return this.http.put(this.api_url+id, usuario, this.headers)
  }

  cambiarClave(id,pass){
    if(this.auth.isTokenValid())
    return this.http.put(this.api_url+id+'/pass', pass, this.headers)
  }

}
