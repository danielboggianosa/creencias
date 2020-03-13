import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styles: []
})
export class UserInfoComponent implements OnInit {

  user:any
  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.user={
      nombre:sessionStorage.getItem('user.nombre'),
      apellido:sessionStorage.getItem('user.apellido'),
      imagen:sessionStorage.getItem('user.imagen'),
      correo:sessionStorage.getItem('user.correo'),
    }
  }

  logout(){
    this.auth.sessionDestroy()
  }

}
