import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerService } from './server.service';
import decode from 'jwt-decode'
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  subs = new SubSink
  api_url;  
  headers = {headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer '+ localStorage.getItem('token'))};

  constructor(private http:HttpClient, private api:ServerService, private router:Router) {
    this.api_url = api.API_URI+'auth/';
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
  
  login(usuario){
    return this.http.post(this.api_url+"login", usuario);
  }

  register(usuario){
    return this.http.post(this.api_url+"register", usuario);
  }

  recover(correo){
    return this.http.post(this.api_url+"recover", correo);
  }

  reset(usuario){
    return this.http.post(this.api_url+"reset", usuario, this.headers)
  }

  public isTokenValid():boolean {
    let token = localStorage.getItem('token')
    let tokenPayLoad = decode(token)
    let now = new Date()
    let exp = new Date(tokenPayLoad.exp*1000)
    if(sessionStorage.getItem('user.id') && now < exp)
      return true
    else{
      this.sessionDestroy()
      return false
    }
  }

  public sessionSet(token){
    let headers = {headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer '+token)};
    this.subs.sink = this.http.get(this.api_url+'validate', headers).subscribe(
      res=> {
        if(res){
            localStorage.setItem('token', token)
            let tokenPayLoad = decode(token)
            let iat = new Date(tokenPayLoad.iat*1000)
            let exp = new Date(tokenPayLoad.exp*1000)
            sessionStorage.setItem('user.id', tokenPayLoad?.id)
            sessionStorage.setItem('user.nombre', tokenPayLoad?.nombre)
            sessionStorage.setItem('user.apellido', tokenPayLoad?.apellido)
            sessionStorage.setItem('user.correo', tokenPayLoad?.correo)
            sessionStorage.setItem('user.imagen', tokenPayLoad?.imagen)
            sessionStorage.setItem('user.rol', tokenPayLoad?.rol)
            sessionStorage.setItem('token.iat', iat.toString())
            sessionStorage.setItem('token.exp', exp.toString())
            if(sessionStorage.getItem('user.id')!=='undefined')
              this.router.navigate(['/dashboard']);
        }
        else this.router.navigate(['/login']);
      }
    )

  }

  public sessionDestroy(){
    localStorage.clear();
    sessionStorage.clear();    
    this.router.navigate(['/login']);
  }

  sessionReset(token){
    return new Promise((resolve,reject)=>{
      let headers = {headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer '+token)};
      this.subs.sink = this.http.get(this.api_url+'validate', headers).subscribe(res=> {
        if(res){
            localStorage.setItem('token', token)
            let tokenPayLoad = decode(token)
            sessionStorage.setItem('user.correo', tokenPayLoad?.correo)
            resolve(tokenPayLoad.correo)
        }
        else reject('no estás autorizado')
      })
    })
  }

}
