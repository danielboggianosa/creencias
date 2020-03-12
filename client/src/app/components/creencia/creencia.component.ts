import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { CreenciaService } from 'src/app/services/creencia.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-creencia',
  templateUrl: './creencia.component.html',
  styles: []
})
export class CreenciaComponent implements OnInit {
  subs = new SubSink
  pageSize: number = 10;
  field:string = 'id';
  order:string = 'asc';
  cardTitle:string = 'Objetivos';
  filterValue: any;
  attributes: any;
  csvData: any;
  totalRows: number;
  dataSource: any;
  tableColumns = [
    {id:'1', key:'id',        title:'ID',       visible:true},
    {id:'2', key:'creencia',  title:'CREENCIA', visible:true},
    {id:'3', key:'createdAt', title:'CREADO',   visible:true},
    {id:'4', key:'updatedAt', title:'ACTUALIZADO',   visible:false},
    {id:'0', key:'options',   title:'OPTIONS',  visible:true},
  ]

  constructor(private creenciaService:CreenciaService) { }

  ngOnInit(): void {
    this.loadData({page:null,size:null,field:null,order:null,value:null,attributes:null});
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  loadData(e:{page,size,field,order,value,attributes}){
    console.log(e);
    let body={
      page:(e.page) ? +e.page : 0,
      size: (e.size) ? +e.size : +this.pageSize,
      field: (e.field) ? e.field : this.field,
      order: (e.order) ? e.order : this.order,
      value: (e.value) ? e.value : this.filterValue,
      attributes: (e.attributes) ? e.attributes : this.attributes
    }
    this.subs.sink = this.creenciaService.listar(body).subscribe(
      res=>{
        this.csvData = res['data'];
        // console.log(this.csvData);
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

  delete(e){
    console.log(e)
  }

  update(e){
    console.log(e)
  }

}
