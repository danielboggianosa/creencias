import { Component, OnInit, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { CreenciaService } from 'src/app/services/creencia.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-creencia',
  templateUrl: './creencia.component.html',
  styles: []
})
export class CreenciaComponent implements OnInit {
  @ViewChild('editar',{static:false}) editar;
  subs = new SubSink
  pageSize: number = 10;
  field:string = 'id';
  order:string = 'asc';
  cardTitle:string = 'Objetivos';
  filterValue: string;
  attributes: any;
  csvData: any;
  totalRows: number;
  dataSource: any;
  tableColumns = [
    {id:'1', key:'id',        title:'ID',       visible:true},
    {id:'2', key:'creencia',  title:'CREENCIA', visible:true},
    {id:'3', key:'createdAt', title:'CREADO',   visible:true},
    {id:'4', key:'updatedAt', title:'ACTUALIZADO',   visible:false},
    {id:'0', key:'options',   title:'OPTIONS',  visible:true, options:{delete:true,edit:true,select:false,unselect:false}},
  ]
  creencia;

  constructor(private creenciaService:CreenciaService, private ngbModal:NgbModal) { }

  ngOnInit(): void {
    this.loadData({page:0,size:this.pageSize,field:this.field,order:this.order,value:this.filterValue,attributes:this.attributes});
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  loadData(e:{page,size,field,order,value,attributes}){
    this.setValues(e)
    const {page,size,value,attributes,field,order} = e
    let body={
      page: (page) ? +page : 0,
      size: (size) ? +size : +this.pageSize,
      field: (field) ? field : this.field,
      order: (order) ? order : this.order,
      value: (value) ? value : this.filterValue,
      attributes: (attributes) ? attributes : this.attributes
    }
    this.subs.sink = this.creenciaService.listar(body).subscribe(
      res=>{
        this.csvData = res['data'];
        this.totalRows = (res['total']);
        this.dataSource = new MatTableDataSource(res['data']);
        this.dataSource.data.forEach(d => {
          d.createdAt = (d.createdAt) ? moment(d.createdAt).fromNow() : '';
          d.updatedAt = (d.updatedAt) ? moment(d.updatedAt).fromNow() : '';
          d.deletedAt = (d.deletedAt) ? moment(d.deletedAt).fromNow() : '';
        });
      }
    )
  }

  setValues(e){
    const {size,value,attributes,field,order} = e
    this.field = (field) ? field : this.field
    this.filterValue = (value) ? value : this.filterValue
    this.pageSize = (size) ? size : this.pageSize
    this.attributes = (attributes) ? attributes : this.attributes
    this.order = (order) ? order : this.order
  }

  delete(e){
    this.subs.sink = this.creenciaService.borrar(e).subscribe(res=>{
      alert(res['message']);
      this.loadData({page:null,size:null,field:null,order:null,value:null,attributes:null});
    })
  }

  update(e){
    this.creencia = this.dataSource.data.filter(d=>d.id == e)[0];
    this.ngbModal.open(this.editar)
    console.log(e)
  }

  actualizar(e){
    delete e.updatedAt;
    delete e.deletedAt;
    delete e.createdAt;
    this.subs.sink = this.creenciaService.actualizar(e.id, e).subscribe(res=>{
      if(res['success'])
        alert(res['message'])
    })
  }



}
