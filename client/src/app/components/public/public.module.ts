import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { UnknownComponent } from './unknown/unknown.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResetComponent } from './reset/reset.component';

@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent,
        RecoverComponent,
        UnknownComponent,
        ResetComponent
    ],
    imports:[
        FormsModule, 
        CommonModule,
        RouterModule
    ]
})
export class PublicPagesModule {}