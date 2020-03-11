import { Component, OnInit, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: []
})
export class TopbarComponent implements OnInit {
  @Output() sideBar = new EventEmitter<any>();
  

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar(){
    this.sideBar.emit();
  }

}
