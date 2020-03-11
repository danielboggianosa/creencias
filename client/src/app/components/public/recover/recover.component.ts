import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styles: []
})
export class RecoverComponent implements OnInit {
  subs = new SubSink

  usuario={correo:null};
  failMessage: any;
  successMessage: any;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.usuario.correo)
      this.subs.sink = this.authService.recover(this.usuario).subscribe(res=>{
        if(res['success']){
          delete this.failMessage;
          this.successMessage = res['msg'];
        }
        else{
          delete this.successMessage;
          this.failMessage = res['msg']
        }
      })
    else
      this.failMessage = "El correo no puede estar vacío"
  }

}
