import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidebar') sidebar;
  user:Usuario

  constructor(){ }

  ngOnInit(): void {
    this.user={
      id:+sessionStorage.getItem('user.id'),
      nombre:sessionStorage.getItem('user.nombre'),
      apellido:sessionStorage.getItem('user.apellido'),
      imagen:sessionStorage.getItem('user.imagen'),
      correo:sessionStorage.getItem('user.correo'),
      rol:+sessionStorage.getItem('user.rol')
    }
  }

  toggleSideBar(){
    this.sidebar.toggle()
  }
  
  public update(user:Usuario){
    this.user = user;
  }

}
