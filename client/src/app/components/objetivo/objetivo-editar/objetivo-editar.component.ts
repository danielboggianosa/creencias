import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-objetivo-editar',
  templateUrl: './objetivo-editar.component.html',
  styles: []
})
export class ObjetivoEditarComponent implements OnInit {
  @Input() objetivo={
    objetivo:null
  };
  @Output() actualizar = new EventEmitter<any>();
  objetivoFields=[
    {id:1, tag:"input", class:"w-100 m-2", name:"objetivo", type:"text", label:"Objetivo:", placeholder:"", required:true, disabled:false}
  ]
  buttonText="actualizar"

  constructor(public modal:NgbModal) { }

  ngOnInit(): void {
  }

  editar(e){
    this.actualizar.emit(e)
    this.close()
  }

  close(){
    this.modal.dismissAll();
  }

}
