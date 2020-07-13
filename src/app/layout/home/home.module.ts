import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';
import { PageHeaderModule } from 'src/app/shared';


@NgModule({
    declarations: [HomeComponent],
    imports: [
      CommonModule,
      CommonModule,
      TranslateModule,
      NgbDropdownModule,
      PageHeaderModule
    ]
  })
  export class HomeModule { }
  