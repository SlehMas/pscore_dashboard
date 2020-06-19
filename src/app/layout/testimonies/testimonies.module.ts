import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../shared';
import { TestimoniesComponent } from './testimonies.component';
import { ArticleRoutingModule } from './testimonies-routing.module';
import { SingleTestimonyComponent } from './single-testimony/single-testimony.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TestimoniesComponent, SingleTestimonyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    ArticleRoutingModule
  ]
})
export class TestimoniesModule { }
