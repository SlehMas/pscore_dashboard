import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestimoniesComponent } from './testimonies.component';
import { SingleTestimonyComponent } from './single-testimony/single-testimony.component';

const routes: Routes = [
    {
        path: '',
        component: TestimoniesComponent
    },
    {
      path: 'edit/:id',
      component: SingleTestimonyComponent
    },
    {
      path: 'new',
      component: SingleTestimonyComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule {}
