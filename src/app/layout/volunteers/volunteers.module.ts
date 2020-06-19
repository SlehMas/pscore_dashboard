import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersComponent } from './volunteers.component';
import { PageHeaderModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleVolunteerComponent } from './single-volunteer/single-volunteer.component';
import { MapComponent } from './map/map.component';

@NgModule({
    imports: [
        CommonModule,
        VolunteersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PageHeaderModule
    ],
    declarations: [VolunteersComponent, SingleVolunteerComponent, MapComponent]
})
export class VolunteersModule {}
