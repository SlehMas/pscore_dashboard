import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsComponent } from './applications.component';
// import { SingleUserComponent } from './single-user/single-user.component';

const routes: Routes = [
    {
        path: '',
        component: ApplicationsComponent
    }
    // ,
    // {
    //   path: 'edit/:id',
    //   component: SingleUserComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationsRoutingModule {}
