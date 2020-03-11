import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreenciaService {

  api_url

  constructor(private api:ServerService, private http:HttpClient) {
    this.api_url = api.API_URI + 'creencia/'
  }

  crear(creencia){
    return this.http.post(this.api_url, creencia)
  }

  crearGrupo(creencias){
    return this.http.post(this.api_url+'bulk', creencias)
  }

  listar(){
    return this.http.get(this.api_url)
  }

  ver(id){
    return this.http.get(this.api_url+id)
  }

  actualizar(id, creencia){
    return this.http.put(this.api_url+id, creencia)
  }

  borrar(id){
    return this.http.delete(this.api_url+id)
  }

}
