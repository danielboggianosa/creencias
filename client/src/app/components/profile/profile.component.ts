import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { ServerService } from 'src/app/services/server.service';
import { UserService } from 'src/app/services/usuario.service';
import { LayoutComponent } from '../layout/layout.component';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit, OnDestroy {
  subs = new SubSink
  usuario:Usuario={
    id: +sessionStorage.getItem('user.id'),
    nombre: sessionStorage.getItem('user.nombre'),
    apellido: sessionStorage.getItem('user.apellido'),
    correo: sessionStorage.getItem('user.correo'),
    imagen: sessionStorage.getItem('user.imagen'),
    rol: +sessionStorage.getItem('user.rol'),
  }
  userFormFields=[
    {id: 1, tag:'input', class:'col-md-6 mb-4', name:'nombre', type:'text',label:'Nombre:', placeholder:'Nombre', required:true, disabled:false, options:[]},
    {id: 2, tag:'input', class:'col-md-6', name:'apellido', type:'text',label:'Apellidos:', placeholder:'Apellidos', required:true, disabled:false, options:[]},
    {id: 3, tag:'input', class:'col-md-6', name:'correo', type:'email',label:'Correo:', placeholder:'Correo', required:true, disabled:false, options:[]},
    {id: 4, tag:'input', class:'d-none', name:'imagen', type:'text',label:'Cambiar imagen:', placeholder:'Cambiar imagen...', required:true, disabled:false, options:[]},
    {id: 4, tag:'input', class:'col-md-6', name:'newimagen', type:'image',label:'Cambiar imagen:', placeholder:'Cambiar imagen...', required:false, disabled:false, options:[]},
  ]
  userButtonText="Actualizar"
  pass={
    password:null,
    newPass:null,
    newPass2:null,
  }
  passFormFields=[
    {id: 1, tag:'input', class:'col-md-12 mb-4', name:'password', type:'password',label:'', placeholder:'Contraseña Actual', required:true, disabled:false, options:[]},
    {id: 2, tag:'input', class:'col-md-6 mb-4', name:'newPass', type:'password',label:'', placeholder:'Nueva Contraseña', required:true, disabled:false, options:[]},
    {id: 3, tag:'input', class:'col-md-6 mb-4', name:'newPass2', type:'password',label:'', placeholder:'Repter Nueva Contraseña', required:true, disabled:false, options:[]},
  ]
  passButtonText = "Cambiar"
  passMessage: string;
  constructor(private server:ServerService, private userService:UserService, private layout:LayoutComponent, private auth:AuthService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  userSendForm(e){
    this.subs.sink = this.userService.actualizar(this.usuario.id, e).subscribe(res=>{
      alert(res['message'])
      if(res['success']){
        this.layout.update(this.usuario)
      }
    })
  }

  userOnChange(e){ //recibes el nombre del campo que ha cambiado
    if(e == 'newimagen'){
      let imagen: File = (<HTMLInputElement>document.getElementById(e)).files[0]
      this.subs.sink = this.server.storeImage(imagen).subscribe(res=>{
        this.usuario.imagen=res
      })
    }
  }

  passSendForm(e){
    if(e.newPass == e.newPass2){
      this.subs.sink = this.userService.cambiarClave(this.usuario.id, e).subscribe(
        res=>{
          if(res['success'])
            alert(res['message'])
            this.auth.sessionDestroy()
        }
      )
    }
    else(
      this.passMessage = "Las contraseñas no coinciden"
    )
  }

  passOnChange(e){ //recibes el nombre del campo que ha cambiado
    // console.log(e, this.pass[e])
  }

  

}
