import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  webTitle='Creencias App';
  webTitleSup;
  @ViewChild('accordionSidebar', {static:true}) accordionSidebar;
  // MENU EXAMPLE STRUCTURE DATA
  menuGroups=[
    {id: 1, title: '', permission:'', menu:[
      {id:1, title: 'Dashboard', icon:'fas fa-fw fa-tachometer-alt', link: '/dashboard', permission:'', subtitle: '', submenu:[]},
    ]},
    {id: 2, title: 'Interface', permission:'', menu:[
      {id:2, title: 'Objetivos', icon:'fas fa-fw fa-bullseye', link: '', permission:'', subtitle: 'Acciones', submenu:[
        {id:3, title:'Ver', link:'', permission:''},
        {id:4, title:'Crear', link:'objetivos/crear', permission:'' },
        {id:6, title:'Asociar', link:'objetivos/asociar', permission:'' },
      ]},
      {id:5, title: 'Creencias', icon:'fas fa-fw fa-brain', link: '', permission:'', subtitle: 'Custom Utilities', submenu:[
        {id:7, title:'Ver', link:'creencias', permission:'' },
        {id:8, title:'Crear', link:'creencias/crear', permission:'' },
      ]},
    ]}
  ]
  activeSubmenu: string;
  group: any;
  menu: any;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.accordionSidebar.nativeElement.classList.toggle('toggled');
  }

  toggleSubmenu(g1, m1){
    let g0 = this.group;
    let m0 = this.menu;
    this.accordionSidebar.nativeElement.children['group_'+g1].children['item_'+m1].children['menu_'+m1].children['submenu_'+m1].classList.toggle('show');

    if(m0 && m0!=m1){
        this.accordionSidebar.nativeElement.children['group_'+g0].children['item_'+m0].children['menu_'+m0].children['submenu_'+m0].classList.remove('show');
    }
    this.group = g1;
    this.menu = m1;
  }

}
