import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styles: []
})
export class ResetComponent implements OnInit {
  subs = new SubSink;
  passMessage: string;
  usuario={
    correo:null,
    password:null
  }

  constructor(private url: ActivatedRoute, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.usuario.correo = this.url.snapshot.paramMap.get('token')
    if(!this.usuario.correo){
      this.router.navigateByUrl('/register');
      alert('No estaás autorizado')
    }
  }

  onSubmit(){
    if(this.usuario.password)
      this.subs.sink = this.authService.reset(this.usuario).subscribe(
        res=>{
          if(res['success']){
            this.router.navigateByUrl('/login');
          }
          else
            alert('Hubo un error, por favor intenta de nuevo')
        }
      )
  }

  validatePass(pass1, pass2){
    if(pass1 != pass2){
      this.passMessage = "Las contraseñas no coinciden";
    }
    else
      delete this.passMessage;
  }

}
