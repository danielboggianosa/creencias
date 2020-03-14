import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public API_URI = environment.serverAddress+":4500/api/";

  constructor(private http:HttpClient) { }

  storeImage(imagen:File):Observable<any>{
    var formData = new FormData();
    formData.append('fileToUpload', imagen);
    return this.http.post('http://138.197.196.196/api/',formData);
  }

}
