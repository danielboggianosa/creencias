import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjetivoComponent } from './components/objetivo/objetivo.component';
import { CreenciaComponent } from './components/creencia/creencia.component';
import { ObjetivoCrearComponent } from './components/objetivo/objetivo-crear/objetivo-crear.component';
import { CreenciaCrearComponent } from './components/creencia/creencia-crear/creencia-crear.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ObjetivoAsociarComponent } from './components/objetivo/objetivo-asociar/objetivo-asociar.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: LayoutComponent,
  children:[
    {path: '', redirectTo: 'objetivos', pathMatch: 'full'},
    {path: 'objetivos', component: ObjetivoComponent},
    {path: 'objetivos/crear', component: ObjetivoCrearComponent},
    {path: 'objetivos/asociar', component: ObjetivoAsociarComponent},
    {path: 'creencias', component: CreenciaComponent},
    {path: 'creencias/crear', component: CreenciaCrearComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
