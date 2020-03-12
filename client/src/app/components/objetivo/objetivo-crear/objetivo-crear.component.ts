import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObjetivoService } from 'src/app/services/objetivo.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-objetivo-crear',
  templateUrl: './objetivo-crear.component.html',
  styles: []
})
export class ObjetivoCrearComponent implements OnInit, OnDestroy {
  subs = new SubSink
  myForm:{objetivo:string};
  myFormFields:Array<object>;
  myForm2:{objetivos:string}
  myFormFields2:Array<object>

  constructor(private objetivoService:ObjetivoService) { }

  ngOnInit(): void {
    this.myForm={
      objetivo:null
    }
    this.myFormFields=[
      {id: 1, tag:'input', name:'objetivo', type:'text', label:'', placeholder:'Escribe un objetivo', required:true, disabled:false, class:'form-group col-sm-12', options:null},
    ]
    this.myForm2={
      objetivos:null
    }
    this.myFormFields2=[
      {id: 1, tag:'textarea', name:'objetivos', type:'text', label:'Objetivos:', placeholder:'Escribe un objetivo por línea o pega desde excel', required:true, disabled:false, class:'form-group col-sm-12', options:[]},
    ]
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  crearUno(e){
    this.subs.sink = this.objetivoService.crear(e).subscribe(
      (res)=>{
        if(res['success']){
          alert(res['message'])
          delete this.myForm.objetivo
        }
        else{
          console.log(res['error'])
        }
      }
    )
  }

  crearVarios(e){
    let objetivos=[];
    e.objetivos.split('\n').forEach(
      o=>{
        if(o)
          objetivos.push({objetivo:o})
      }
    )
    this.subs.sink = this.objetivoService.crearGrupo(objetivos).subscribe(
      (res)=>{
        if(res['success']){
          alert(res['message'])
          delete this.myForm2.objetivos
        }
        else{
          console.log(res['error'])
        }
      }
    )
  }

}
