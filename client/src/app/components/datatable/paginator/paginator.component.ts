import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styles: []
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() pageSize;
  @Input() totalRows: number;
  @Input() pageSizeOptions: Array<number> = [];
  @Output() loadData = new EventEmitter<any>();
  @Output() loadSize = new EventEmitter<any>();
  lastPage: number;
  currentPage: number = 1;
  pages: any[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.fillPages();
  }

  changeSize(){
    this.fillPages();
    this.loadSize.emit(this.pageSize);
  }

  //paginacion
  pagination(p){
    this.currentPage = p;
    let i = (this.currentPage * this.pageSize) - this.pageSize;
    this.loadData.emit(i)
  }

  paginationPrev(){
    this.currentPage = (this.currentPage > 1) ? this.currentPage - 1 : this.currentPage;
    let i = (this.currentPage * this.pageSize) - this.pageSize;
    this.loadData.emit(i)
  }

  paginationNext(){
    this.currentPage = (this.currentPage < this.lastPage) ? this.currentPage + 1 : this.lastPage;
    let i = (this.currentPage * this.pageSize) - this.pageSize;
    this.loadData.emit(i)
  }
  paginationFirst(){
    this.currentPage = 1,
    this.loadData.emit(0)
  }
  paginationLast(){
    this.currentPage = this.lastPage
    let i = (this.lastPage * this.pageSize) - this.pageSize;
    this.loadData.emit(i)
  }

  fillPages(){
    this.pages=[];
    let b = Math.ceil(this.totalRows/this.pageSize);
    for(let i=1; i<=b; i++){
      this.pages.push(i);
      this.lastPage = i;
    }
  }

}
