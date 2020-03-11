import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_url;

  constructor(private http:HttpClient, private api:ServerService) {
    this.api_url = api.API_URI+'auth/';
  }
  
  login(usuario){
    return this.http.post(this.api_url+"login", usuario);
  }

  register(usuario){
    return this.http.post(this.api_url+"register", usuario);
  }

  recover(correo){
    return this.http.post(this.api_url+"recover", correo);
  }

  reset(usuario){
    return this.http.post(this.api_url+"reset", usuario);
  }

}
