import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { CreenciaService } from 'src/app/services/creencia.service';

@Component({
  selector: 'app-creencia-crear',
  templateUrl: './creencia-crear.component.html',
  styles: []
})
export class CreenciaCrearComponent implements OnInit {
  subs = new SubSink
  myForm:{creencia:string};
  myFormFields:Array<object>;
  myForm2:{creencias:string}
  myFormFields2:Array<object>

  constructor(private creenciaService:CreenciaService) { }

  ngOnInit(): void {
    this.myForm={
      creencia:null
    }
    this.myFormFields=[
      {id: 1, tag:'input', name:'creencia', type:'text', label:'', placeholder:'Escribe un creencia', required:true, disabled:false, class:'form-group col-sm-12', options:null},
    ]
    this.myForm2={
      creencias:null
    }
    this.myFormFields2=[
      {id: 1, tag:'textarea', name:'creencias', type:'text', label:'Creencias:', placeholder:'Escribe un creencia por línea o pega desde excel', required:true, disabled:false, class:'form-group col-sm-12', options:[]},
    ]
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  crearUno(e){
    this.subs.sink = this.creenciaService.crear(e).subscribe(
      (res)=>{
        if(res['success']){
          alert(res['message'])
          console.log(res['data'])
          delete this.myForm.creencia
        }
        else{
          console.log(res['error'])
        }
      }
    )
  }

  crearVarios(e){
    let creencias=[];
    e.creencias.split('\n').forEach(
      o=>{
        if(o)
          creencias.push({creencia:o})
      }
    )
    this.subs.sink = this.creenciaService.crearGrupo(creencias).subscribe(
      (res)=>{
        if(res['success']){
          alert(res['message'])
          console.log(res['data'])
          delete this.myForm2.creencias
        }
        else{
          console.log(res['error'])
        }
      }
    )
  }
}
