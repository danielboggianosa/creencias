import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidebar') sidebar;

  constructor(){ }

  ngOnInit(): void {
  }

  toggleSideBar(){
    this.sidebar.toggle()
  }

}
