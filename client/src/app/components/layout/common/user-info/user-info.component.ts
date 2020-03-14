import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styles: []
})
export class UserInfoComponent implements OnInit {

  @Input() user:Usuario
  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.auth.sessionDestroy()
  }


}
