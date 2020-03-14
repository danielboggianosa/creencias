import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjetivoComponent } from './components/objetivo/objetivo.component';
import { CreenciaComponent } from './components/creencia/creencia.component';
import { CreenciaCrearComponent } from './components/creencia/creencia-crear/creencia-crear.component';
import { ObjetivoCrearComponent } from './components/objetivo/objetivo-crear/objetivo-crear.component';
import { LayoutModule } from './components/layout/layout.module';
import { PublicPagesModule } from './components/public/public.module';
import { ObjetivoAsociarComponent } from './components/objetivo/objetivo-asociar/objetivo-asociar.component';
// import { DataTableModule } from './components/datatable/datatable.module';
import { FormsModule } from '@angular/forms';
import { FormsComponent } from './components/forms/forms.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './components/datatable/datatable.component';
import { Angular2CsvModule } from 'angular2-csv';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { FilterColumnsComponent } from './components/datatable/filter-columns/filter-columns.component';
import { PaginatorComponent } from './components/datatable/paginator/paginator.component';
import { ReportsComponent } from './components/datatable/reports/reports.component';
import { MatSortModule } from '@angular/material/sort';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjetivoComponent,
    CreenciaComponent,
    CreenciaCrearComponent,
    ObjetivoCrearComponent,
    ObjetivoAsociarComponent,
    FormsComponent,
    FilterColumnsComponent,
    PaginatorComponent,
    ReportsComponent,
    DataTableComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    PublicPagesModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    Angular2CsvModule,
    MatTableModule,
    MatExpansionModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
