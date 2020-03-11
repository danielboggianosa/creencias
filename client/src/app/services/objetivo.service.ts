import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {
  
  api_url

  constructor(private api:ServerService, private http:HttpClient) {
    this.api_url = api.API_URI + 'objetivo/'
  }

  crear(objetivo){
    return this.http.post(this.api_url, objetivo)
  }

  crearGrupo(objetivos){
    return this.http.post(this.api_url+'bulk', objetivos)
  }

  listar(){
    return this.http.get(this.api_url)
  }

  ver(id){
    return this.http.get(this.api_url+id)
  }

  actualizar(id, objetivo){
    return this.http.put(this.api_url+id, objetivo)
  }

  borrar(id){
    return this.http.delete(this.api_url+id)
  }

  asociar(id, creencias){
    return this.http.post(this.api_url+id+'/asociar', creencias)
  }

  verAsociado(id){
    return this.http.get(this.api_url+id+'/asociado')
  }
}
