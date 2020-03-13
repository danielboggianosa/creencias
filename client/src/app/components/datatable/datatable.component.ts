import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SubSink } from 'subsink';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import 'moment/locale/es-us';

@Component({
  selector: 'app-data-table',
  templateUrl: './datatable.component.html',
  styles: []
})
export class DataTableComponent implements OnInit, OnDestroy, OnChanges {
  subs = new SubSink
  @Input() tableColumns:Array<{id:string, key:string, title:string,   visible:boolean, options:{delete:boolean,edit:boolean,select:boolean,unselect:boolean}}>;  
  @Input() dataSource;
  @Input() csvData;
  @Input() cardTitle:string;  
  @Input() pageSize:number=10;
  @Input() totalRows: number;
  @Input() filterValue:string;
  @Input() field:string = 'id';
  @Input() order:string = 'asc';

  // Selectores de ADDONS
  @Input() SearchForm = true;
  @Input() FilterColumns = true;
  @Input() DownloadReport = true;
  @Input() Pagination = true;

  // Cambiar clase según selección
  @Input() selectedRows:Array<number>=[]


  @Output() getData = new EventEmitter<any>();
  @Output() deleteData = new EventEmitter<any>();
  @Output() updateData = new EventEmitter<any>();
  @Output() selectData = new EventEmitter<any>();
  // ARMADO DINÁMICO DE LA TABLA
  // title: corresponde al título que tendrá cada columna
  // key: es el identificador de la tabla que contiene el valor (propiedad)
    /* {id:'1', key:'id',        title:'ID',       visible:true},
    {id:'2', key:'nombre',    title:'NOMBRE',   visible:true},
    {id:'3', key:'apellido',  title:'APELLIDO', visible:true},
    {id:'4', key:'correo',    title:'CORREO',   visible:true},
    {id:'5', key:'imagen',    title:'IMAGEN',   visible:false},
    {id:'6', key:'password',  title:'PASSWORD',   visible:false},
    {id:'7', key:'rol',       title:'ROL',      visible:false},
    {id:'8', key:'createdAt', title:'CREADO',   visible:true},
    {id:'9', key:'updatedAt', title:'ACTUALIZADO',   visible:false},
    {id:'10', key:'deletedAt', title:'BORRADO',   visible:false},
    {id:'0', key:'options',   title:'OPTIONS',  visible:true}, */
  attributes: any;
  displayedColumns: string[];

  constructor(private userService:UserService){}

  ngOnInit(): void {
    // OBTENEMOS LA DATA DE ALGÚN SERVICIO Y LA ASIGANAMOS AL DATASOURCE
    // this.loadData()    
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  loadData(e){
    this.getData.emit(e);
  }

  ngOnChanges(){
    this.displayedColumns = this.tableColumns.map(c => c.id);
    this.attributes = this.tableColumns.filter(c => c.visible && c.id!='0').map(m=>m.key);
  }

  loadSize(e){
    this.pageSize = e;
    this.loadData({size: e});
  }

  loadPage(e){
    this.loadData({page: e});
  }

  loadColumns(e){
    this.attributes = e;
    this.loadData({attributes:e});
  }

  searchData(){
    this.loadData({value:this.filterValue})
  }
  
  delete(id){
    this.deleteData.emit(id);
  }

  edit(id){
    this.updateData.emit(id);
  }

  sortData(e){
    if(e.active != 0){
      this.field = this.tableColumns.filter(c=>c.id==e.active)[0].key
      this.order = e.direction;
      this.loadData({field:this.field, order:this.order})
    }
  }

  select(e){
    this.selectData.emit(e);
  }




}