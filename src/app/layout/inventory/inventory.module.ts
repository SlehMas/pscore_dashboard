import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../shared';
import { InventoryComponent } from './inventory.component';
import { ArticleRoutingModule } from './inventory-routing.module';
import { SingleProductComponent } from './single-product/single-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InventoryComponent, SingleProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    ArticleRoutingModule
  ]
})
export class InventoryModule { }
