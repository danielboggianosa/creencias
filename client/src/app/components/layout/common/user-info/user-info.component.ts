import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styles: []
})
export class UserInfoComponent implements OnInit {

  user:any
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.user={
      nombre:sessionStorage.getItem('user.nombre'),
      apellido:sessionStorage.getItem('user.apellido'),
      imagen:sessionStorage.getItem('user.imagen'),
      correo:sessionStorage.getItem('user.correo'),
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
