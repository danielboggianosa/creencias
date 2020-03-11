import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: []
})
export class ReportsComponent implements OnInit, OnChanges {
  @Input() columns=[];
  @Input() data=[];
  newData:Array<any[]>=[];
  headers;
  keys
  now = new Date();
  /*name of the excel-file which will be downloaded. */ 
  xlsxFileName = 'TableReport '+this.now;
  csvFileName = 'TableReport '+this.now+'.csv';
  options;
  @ViewChild('angular2Csv',{static:false}) angular2Csv;

  constructor() { }

  ngOnInit(): void {
    
    
  }

  ngOnChanges(){
    this.headers= this.columns.filter(c => c.visible && c.id!='0').map(c=> c.title);
    this.keys=this.columns.filter(c => c.visible && c.id!='0').map(m=>m.key);
    this.newData=[];
    this.data.forEach(
      (d,i)=>{
        let campos = []
        this.keys.forEach(
          (k,j)=>{
            campos.push(d[k])
          }
        )
        this.newData.push(campos)
      }
    )
    // console.log(this.keys);
    this.options = {
      title: '',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: this.headers
    };
  }

  downloadCsv(){
    this.angular2Csv.generateCsv();
  }

  downloadExcel(){}
 

}
