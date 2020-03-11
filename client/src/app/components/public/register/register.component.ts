import { Component, OnInit, OnDestroy } from '@angular/core';
import {SubSink} from 'subsink'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  subs = new SubSink;

  usuario={
    nombre:null,
    apellido:null,
    correo:null,
    password:null
  }
  mailMessage: string;
  userMessage: string;
  apellidoMessage: string;
  nombreMessage: string;
  passMessage: string;

  constructor(protected authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  register(){
    console.log('registrando', this.usuario);
    if(this.validar())
      this.subs.sink = this.authService.register(this.usuario).subscribe(
        res=>{
          alert(res['msg']);
          if(res['msg'] == "Usuario Creado Correctamente"){
            sessionStorage.setItem('user.nombre', res['user'].nombre)
            sessionStorage.setItem('user.apellido', res['user'].apellido)
            sessionStorage.setItem('user.correo', res['user'].correo)
            sessionStorage.setItem('user.imagen', res['user'].imagen)
            if(sessionStorage.getItem('user.correo'))
              this.router.navigateByUrl('/dashboard');
          }
        }
      )
  }

  validar():boolean{
    if(this.usuario.nombre && this.usuario.apellido && this.usuario.password && this.validateEmail(this.usuario.correo))
      return true
    else{
      if(!this.usuario.nombre)
        this.nombreMessage = "El nombre es obligatorio"
      if(!this.usuario.apellido)
        this.apellidoMessage = "El apellido es obligatorio"
      if(!this.usuario.correo)
        this.mailMessage = "El correo es obligatorio"
      if(!this.usuario.password)
        this.passMessage = "La contraseña es obligatoria"
      return false
     } 
  }

  validateEmail(mail){
    const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (mail && format.test(mail)){
      delete this.mailMessage;
      return (true)
    }
    else{
      this.mailMessage = "El correo no es válido"
      return (false)
    }
  }

  validatePass(pass1, pass2){
    if(pass1 != pass2){
      this.passMessage = "Las contraseñas no coinciden";
    }
    else
      delete this.passMessage;
  }

}
