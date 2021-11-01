import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Q3RoutingModule } from './q3-routing.module';
import { Q3Component } from './q3.component';


@NgModule({
  declarations: [
    Q3Component
  ],
  imports: [
    CommonModule,
    Q3RoutingModule
  ]
})
export class Q3Module { }
