import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreenciaService {
  headers = {headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer '+localStorage.getItem('token'))};
  api_url

  constructor(private api:ServerService, private http:HttpClient) {
    this.api_url = api.API_URI + 'creencia/'
  }

  crear(creencia){
    return this.http.post(this.api_url, creencia, this.headers)
  }

  crearGrupo(creencias){
    return this.http.post(this.api_url+'bulk', creencias, this.headers)
  }

  listar(body){
    return this.http.post(this.api_url+'list', body, this.headers)
  }

  ver(id){
    return this.http.get(this.api_url+id, this.headers)
  }

  actualizar(id, creencia){
    return this.http.put(this.api_url+id, creencia, this.headers)
  }

  borrar(id){
    return this.http.delete(this.api_url+id, this.headers)
  }

}
