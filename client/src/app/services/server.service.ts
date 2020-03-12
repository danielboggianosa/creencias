import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public API_URI = "http://127.0.0.1:4500/api/";

  constructor() { }
}
