import { BrowserModule } from '@angular/platform-browser';
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
import { DataTableModule } from './components/datatable/datatable.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ObjetivoComponent,
    CreenciaComponent,
    CreenciaCrearComponent,
    ObjetivoCrearComponent,
    ObjetivoAsociarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    PublicPagesModule,
    DataTableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
