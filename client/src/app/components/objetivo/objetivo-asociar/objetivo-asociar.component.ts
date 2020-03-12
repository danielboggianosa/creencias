import { Component, OnInit, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { ObjetivoService } from 'src/app/services/objetivo.service';
import { CreenciaComponent } from '../../creencia/creencia.component';
import { CreenciaService } from 'src/app/services/creencia.service';
import { CreenciaCrearComponent } from '../../creencia/creencia-crear/creencia-crear.component';
import { ObjetivoComponent } from '../objetivo.component';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-objetivo-asociar',
  templateUrl: './objetivo-asociar.component.html',
  styles: []
})
export class ObjetivoAsociarComponent implements OnInit {
  subs = new SubSink
  @ViewChild('creenciasTable',{static:false}) creenciasTable

  ob_tableColumns = [
    {id:'1', key:'id',        title:'ID',       visible:true},
    {id:'2', key:'objetivo',  title:'OBJETIVO', visible:true},
    {id:'0', key:'options',   title:'OPCIONES',  visible:true, options:{delete:false,edit:false,select:true,unselect:false}},
  ]
  ob_dataSource
  ob_csvData
  ob_cardTitle="Elije un obejtivo"
  ob_pageSize: number = 10;
  ob_field:string = 'id';
  ob_order:string = 'asc';
  ob_totalRows
  ob_filterValue
  ob_attributes

  cr_tableColumns = [
    {id:'1', key:'id',        title:'ID',       visible:true},
    {id:'2', key:'creencia',  title:'CREENCIA', visible:true},
    {id:'0', key:'options',   title:'OPCIONES',  visible:true, options:{delete:false,edit:false,select:true,unselect:false}},
  ]
  cr_dataSource
  cr_csvData
  cr_cardTitle="Selecciona las Creencias"
  cr_pageSize: number = 10;
  cr_field:string = 'id';
  cr_order:string = 'asc';
  cr_totalRows
  cr_filterValue
  cr_attributes

  objetivo:any;
  creencias_elegidas:Array<object>=[]
  creencias_ids:Array<number>=[]
  creencias_asociadas:Array<number>=[];

  constructor(
    private objetivoService:ObjetivoService, 
    private creenciaService:CreenciaService){ 
      this.ob_loadData({page:0,size:this.ob_pageSize,field:this.ob_field,order:this.ob_order,value:this.ob_filterValue,attributes:this.ob_attributes});
      this.cr_loadData({page:0,size:this.cr_pageSize,field:this.cr_field,order:this.cr_order,value:this.cr_filterValue,attributes:this.cr_attributes});
    }

  ngOnInit(): void {
  }

  ob_loadData(e:{page,size,field,order,value,attributes}){
    this.ob_setValues(e)
    const {page,size,value,attributes,field,order} = e
    let body={
      page: (page) ? +page : 0,
      size: (size) ? +size : +this.ob_pageSize,
      field: (field) ? field : this.ob_field,
      order: (order) ? order : this.ob_order,
      value: (value) ? value : this.ob_filterValue,
      attributes: (attributes) ? attributes : this.ob_attributes
    }
    this.subs.sink = this.objetivoService.listar(body).subscribe(
      res=>{
        this.ob_csvData = res['data'];
        this.ob_totalRows = (res['total']);
        this.ob_dataSource = new MatTableDataSource(res['data']);
        this.ob_dataSource.data.forEach(d => {
          d.createdAt = (d.createdAt) ? moment(d.createdAt).fromNow() : '';
          d.updatedAt = (d.updatedAt) ? moment(d.updatedAt).fromNow() : '';
          d.deletedAt = (d.deletedAt) ? moment(d.deletedAt).fromNow() : '';
        });
      }
    )
  }

  ob_setValues(e){
    const {size,value,attributes,field,order} = e
    this.ob_field = (field) ? field : this.ob_field
    this.ob_filterValue = (value) ? value : this.ob_filterValue
    this.ob_pageSize = (size) ? size : this.ob_pageSize
    this.ob_attributes = (attributes) ? attributes : this.ob_attributes
    this.ob_order = (order) ? order : this.ob_order
  }

  ob_delete(e){}

  ob_update(e){}

  ob_select(e){
    this.objetivo = e;
    this.subs.sink = this.objetivoService.verAsociado(e.id).subscribe(res=>{
      this.creencias_elegidas = res['data']['Creencias'];
      this.creencias_asociadas = this.creencias_elegidas.map(c=>c['id'])
      this.creenciasTable.selectedRows = this.creencias_asociadas;
    })
    console.log(this.creencias_ids)
  }

  ob_unselect(){
    delete this.objetivo;
    this.creencias_ids = [];
    this.creencias_elegidas = [];
  }

  ob_asociar(){
    this.subs.sink = this.objetivoService.asociar(this.objetivo.id,{creencias: this.creencias_ids}).subscribe(res=>{
      alert(res['message'])
    })
  }
  
  cr_loadData(e:{page,size,field,order,value,attributes}){
    this.cr_setValues(e)
    const {page,size,value,attributes,field,order} = e
    let body={
      page: (page) ? +page : 0,
      size: (size) ? +size : +this.cr_pageSize,
      field: (field) ? field : this.cr_field,
      order: (order) ? order : this.cr_order,
      value: (value) ? value : this.cr_filterValue,
      attributes: (attributes) ? attributes : this.cr_attributes
    }
    this.subs.sink = this.creenciaService.listar(body).subscribe(
      res=>{
        this.cr_csvData = res['data'];
        this.cr_totalRows = (res['total']);
        this.cr_dataSource = new MatTableDataSource(res['data']);
        this.cr_dataSource.data.forEach(d => {
          d.createdAt = (d.createdAt) ? moment(d.createdAt).fromNow() : '';
          d.updatedAt = (d.updatedAt) ? moment(d.updatedAt).fromNow() : '';
          d.deletedAt = (d.deletedAt) ? moment(d.deletedAt).fromNow() : '';
        });
      }
    )
  }

  cr_setValues(e){
    const {size,value,attributes,field,order} = e
    this.cr_field = (field) ? field : this.cr_field
    this.cr_filterValue = (value) ? value : this.cr_filterValue
    this.cr_pageSize = (size) ? size : this.cr_pageSize
    this.cr_attributes = (attributes) ? attributes : this.cr_attributes
    this.cr_order = (order) ? order : this.cr_order
  }
  
  cr_delete(e){}

  cr_update(e){}

  cr_select(e){
    if(this.creencias_ids.indexOf(e.id) == -1 && this.creencias_asociadas.indexOf(e.id) == -1 ){
      this.creencias_elegidas.push(e)
      this.creencias_ids.push(e.id)
      this.creenciasTable.selectedRows.push(e.id)
    }
  }

  cr_unselect(e){
    let i = this.creencias_elegidas.indexOf(e)
    let s = this.creencias_ids.indexOf(e.id)
    if(i>-1){
      this.creencias_elegidas.splice(i,1)
      this.creenciasTable.selectedRows.splice(i,1)
    }
    if(s>-1){
      this.creencias_ids.splice(s,1)
    }
  }
}
