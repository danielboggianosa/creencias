import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {
  headers = {headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer '+localStorage.getItem('token'))};
  api_url

  constructor(private api:ServerService, private http:HttpClient, private auth:AuthService) {
    this.api_url = api.API_URI + 'objetivo/'
  }

  crear(objetivo){
    if(this.auth.isTokenValid())
    return this.http.post(this.api_url, objetivo, this.headers)
  }

  crearGrupo(objetivos){
    if(this.auth.isTokenValid())
      return this.http.post(this.api_url+'bulk', objetivos, this.headers)
  }

  listar(body){
    if(this.auth.isTokenValid())
      return this.http.post(this.api_url+'list', body, this.headers)
  }

  ver(id){
    if(this.auth.isTokenValid())
      return this.http.get(this.api_url+id, this.headers)
  }

  actualizar(id, objetivo){
    if(this.auth.isTokenValid())
      return this.http.put(this.api_url+id, objetivo, this.headers)
  }

  borrar(id){
    if(this.auth.isTokenValid())
      return this.http.delete(this.api_url+id, this.headers)
  }

  asociar(id, creencias){
    if(this.auth.isTokenValid())
      return this.http.post(this.api_url+id+'/asociar', creencias, this.headers)
  }

  verAsociado(id){
    if(this.auth.isTokenValid())
      return this.http.get(this.api_url+id+'/asociado', this.headers)
  }
}
