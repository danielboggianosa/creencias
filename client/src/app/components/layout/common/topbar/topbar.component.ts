import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';



@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: []
})
export class TopbarComponent implements OnInit {
  @Output() sideBar = new EventEmitter<any>();
  @Input() user:Usuario
  

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar(){
    this.sideBar.emit();
  }

}
