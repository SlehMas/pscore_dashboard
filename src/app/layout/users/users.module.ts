import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../shared';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SingleUserComponent } from './single-user/single-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent, SingleUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    PageHeaderModule
  ]
})
export class UsersModule { }
