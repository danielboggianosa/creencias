import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjetivoComponent } from './components/objetivo/objetivo.component';
import { CreenciaComponent } from './components/creencia/creencia.component';
import { ObjetivoCrearComponent } from './components/objetivo/objetivo-crear/objetivo-crear.component';
import { CreenciaCrearComponent } from './components/creencia/creencia-crear/creencia-crear.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ObjetivoAsociarComponent } from './components/objetivo/objetivo-asociar/objetivo-asociar.component';
import { LoginComponent } from './components/public/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UnknownComponent } from './components/public/unknown/unknown.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecoverComponent } from './components/public/recover/recover.component';
import { ResetComponent } from './components/public/reset/reset.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'recover', component: RecoverComponent},
  {path: 'reset/:token', component: ResetComponent},
  {path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuardService], canActivateChild:[AuthGuardService], children:[
    {path: '', redirectTo: 'objetivos/ver', pathMatch: 'full'},
    {path: 'objetivos/ver', component: ObjetivoComponent},
    {path: 'objetivos/crear', component: ObjetivoCrearComponent},
    {path: 'objetivos/asociar', component: ObjetivoAsociarComponent},
    {path: 'creencias', component: CreenciaComponent},
    {path: 'creencias/crear', component: CreenciaCrearComponent},
    {path: 'profile', component: ProfileComponent},
  ]},
  {path: '**', component: UnknownComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
