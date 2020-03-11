import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getDummyData(page, size):Observable<any>{   
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

  getFilteredData(value):Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/posts/?id='+value)
  }

}
