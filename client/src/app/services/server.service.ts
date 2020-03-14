import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public API_URI = "http://127.0.0.1:4500/api/";

  constructor(private http:HttpClient) { }

  storeImage(imagen):Observable<any>{
    var formData = new FormData();
    formData.append('fileToUpload', imagen);
    return this.http.post('http://138.197.196.196/api/',formData);
  }

}
