import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public API_URI = "http://localhost:4500/api/";

  constructor() { }
}
