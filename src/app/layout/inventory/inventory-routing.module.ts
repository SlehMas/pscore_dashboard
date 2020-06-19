import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { SingleProductComponent } from './single-product/single-product.component';

const routes: Routes = [
    {
        path: '',
        component: InventoryComponent
    },
    {
      path: 'edit/:id',
      component: SingleProductComponent
    },
    {
      path: 'new',
      component: SingleProductComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule {}
