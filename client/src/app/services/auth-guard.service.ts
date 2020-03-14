import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { SubSink } from 'subsink';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, OnDestroy{
  subs = new SubSink

  constructor(private auth:AuthService, private router:Router) { }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  canActivate(): boolean {
    if(localStorage.getItem('token') && sessionStorage.getItem('user.id') && sessionStorage.getItem('user.id')!=='undefined'){
      return this.auth.isTokenValid()
    }
    else{
      this.router.navigate(['/login'])
      return false
    }
  }

  canActivateChild(): boolean {
    if(localStorage.getItem('token') && sessionStorage.getItem('user.id') && sessionStorage.getItem('user.id')!=='undefined'){
      return this.auth.isTokenValid()
    }
    else{
      this.auth.sessionDestroy()
      return false
    }
  }
}
