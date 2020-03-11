import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { SubSink } from 'subsink';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import 'moment/locale/es-us';

@Component({
  selector: 'app-data-table',
  templateUrl: './datatable.component.html',
  styles: []
})
export class DataTableComponent implements OnInit, OnDestroy {
  subs = new SubSink
  @Input() dataSource;
  csvData;
  @Input() cardTitle="Users";
  @Input() pageTitle="Tables";
  @Input() pageDescription="Para visualizar la data en esta tabla debes conectarte a un backend o a través de un servicio que traiga los datos. Revisa las instrucciones en los comentarios del código para mayor información";
  
  // ARMADO DINÁMICO DE LA TABLA
  // title: corresponde al título que tendrá cada columna
  // key: es el identificador de la tabla que contiene el valor (propiedad)
  @Input() tableColumns=[
    {id:'1', key:'id',        title:'ID',       visible:true},
    {id:'2', key:'nombre',    title:'NOMBRE',   visible:true},
    {id:'3', key:'apellido',  title:'APELLIDO', visible:true},
    {id:'4', key:'correo',    title:'CORREO',   visible:true},
    {id:'5', key:'imagen',    title:'IMAGEN',   visible:false},
    {id:'6', key:'password',  title:'PASSWORD',   visible:false},
    {id:'7', key:'rol',       title:'ROL',      visible:false},
    {id:'8', key:'createdAt', title:'CREADO',   visible:true},
    {id:'9', key:'updatedAt', title:'ACTUALIZADO',   visible:false},
    {id:'10', key:'deletedAt', title:'BORRADO',   visible:false},
    {id:'0', key:'options',   title:'OPTIONS',  visible:true},
  ];
  displayedColumns = this.tableColumns.map(c => c.id);
  attributes = this.tableColumns.filter(c => c.visible && c.id!='0').map(m=>m.key);
  pageSize:number=10;
  totalRows: number;
  filterValue:any;
  field:string = 'id';
  order:string = 'asc';

  constructor(private userService:UserService){}

  ngOnInit(): void {
    // OBTENEMOS LA DATA DE ALGÚN SERVICIO Y LA ASIGANAMOS AL DATASOURCE
    // this.loadData()    
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  loadData(page=null, value=null, field=null, order=null, attributes=null){
    let body={
      page:(page) ? +page : 0,
      size: +this.pageSize,
      field: (field) ? field : this.field,
      order: (order) ? order : this.order,
      value: (value) ? value : this.filterValue,
      attributes: (attributes) ? attributes : this.attributes
    }
    this.subs.sink = this.userService.getUsers(body).subscribe(
      res=>{
        this.csvData = res['data'];
        console.log(this.csvData);
        this.totalRows = (res['total']);
        this.dataSource = new MatTableDataSource(res['data']);
        this.dataSource.data.forEach(d => {
          d.createdAt = moment(d.createdAt).fromNow();
          d.updatedAt = moment(d.updatedAt).fromNow();
          d.deletedAt = moment(d.deletedAt).fromNow();
        });
      }
    )
  }

  loadSize(e){
    this.pageSize = e;
    this.loadData();
  }

  loadColumns(e){
    this.attributes = e;
    this.loadData();
  }

  delete(id){
    let del = confirm("¿Do you really want to delete this entry?")
    if(del){
      this.subs.sink = this.userService.deleteUser(id).subscribe(
        res=>{
          alert(res['message']);
          this.loadData();
        }
      )
    }
  }

  edit(id){
    
  }

  sortData(e){
    if(e.active != 6){
      this.field = this.tableColumns.filter(c=>c.id==e.active)[0].key
      this.order = e.direction;
      this.loadData(0, null, this.field, this.order)
    }
  }



}