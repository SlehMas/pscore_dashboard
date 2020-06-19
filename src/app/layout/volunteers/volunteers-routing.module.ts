import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VolunteersComponent } from './volunteers.component';
import { SingleVolunteerComponent } from './single-volunteer/single-volunteer.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
    {
        path: '',
        component: VolunteersComponent
    },
    {
      path: 'edit/:id',
      component: SingleVolunteerComponent
    },
    {
      path: 'new',
      component: SingleVolunteerComponent
    },
    {
      path: 'map',
      component: MapComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VolunteersRoutingModule {}
