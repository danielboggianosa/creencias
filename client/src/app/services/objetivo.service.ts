import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {
  headers = {headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer '+localStorage.getItem('token'))};
  api_url

  constructor(private api:ServerService, private http:HttpClient) {
    this.api_url = api.API_URI + 'objetivo/'
  }

  crear(objetivo){
    return this.http.post(this.api_url, objetivo, this.headers)
  }

  crearGrupo(objetivos){
    return this.http.post(this.api_url+'bulk', objetivos, this.headers)
  }

  listar(body){
    return this.http.post(this.api_url+'list', body, this.headers)
  }

  ver(id){
    return this.http.get(this.api_url+id, this.headers)
  }

  actualizar(id, objetivo){
    return this.http.put(this.api_url+id, objetivo, this.headers)
  }

  borrar(id){
    return this.http.delete(this.api_url+id, this.headers)
  }

  asociar(id, creencias){
    return this.http.post(this.api_url+id+'/asociar', creencias, this.headers)
  }

  verAsociado(id){
    return this.http.get(this.api_url+id+'/asociado', this.headers)
  }
}
