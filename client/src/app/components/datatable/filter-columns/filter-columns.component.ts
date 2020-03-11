import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-columns',
  templateUrl: './filter-columns.component.html',
  styles: []
})
export class FilterColumnsComponent implements OnInit {
  @Input() columns;
  @Output() loadColumns = new EventEmitter<any>();

  constructor(private modal:NgbModal) { }

  ngOnInit(): void {
  }

  open(content){
    this.modal.open(content, {size:'sm', centered:false});
  }
  close(){
    this.modal.dismissAll();
  }

  filtrar(){
    let attributes = this.columns.filter(c => c.visible && c.id!='0').map(m=>m.key);
    this.loadColumns.emit(attributes);
    this.modal.dismissAll();
  }

}
