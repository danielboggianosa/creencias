import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-creencia-editar',
  templateUrl: './creencia-editar.component.html'
})
export class CreenciaEditarComponent implements OnInit {
  @Input() creencia={
    creencia:null
  };
  @Output() actualizar = new EventEmitter<any>();
  creenciaFields=[
    {id:1, tag:"input", class:"w-100 m-2", name:"creencia", type:"text", label:"Creencia:", placeholder:"", required:true, disabled:false}
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
