import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { TopbarComponent } from './common/topbar/topbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FooterComponent } from './common/footer/footer.component';
import { LogoutComponent } from './common/logout/logout.component';
import { SearchComponent } from './common/search/search.component';
import { AlertsComponent } from './common/alerts/alerts.component';
import { MessageComponent } from './common/message/message.component';
import { UserInfoComponent } from './common/user-info/user-info.component';

@NgModule({
    declarations:[
        LayoutComponent,
        TopbarComponent,
        SidebarComponent,
        FooterComponent,
        LogoutComponent,
        SearchComponent,
        AlertsComponent,
        MessageComponent,
        UserInfoComponent,
    ],
    imports:[
        RouterModule,
        CommonModule
    ],
})
export class LayoutModule {}