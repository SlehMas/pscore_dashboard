import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
    imports: [
        CommonModule,
        ApplicationsRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        PageHeaderModule
    ],
    declarations: [ApplicationsComponent]
})
export class ApplicationsModule {}
