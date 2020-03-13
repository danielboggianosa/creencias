import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  subs = new SubSink;
  usuario={
    correo:null,
    password:null,
  }
  @ViewChild('loginForm',{static:false}) loginForm;
  loginMessage: string;

  constructor(protected authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  login(){
    console.log('validando');
    this.subs.sink = this.authService.login(this.usuario).subscribe(
      res=>{
        if(res['success']){
          this.authService.sessionSet(res['token'])
        } 
        else
          this.loginMessage = res['message'];
      }
    )
    this.loginForm.nativeElement.reset();
  }

}
