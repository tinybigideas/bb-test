import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Q1RoutingModule } from './q1-routing.module';
import { Q1Component } from './q1.component';


@NgModule({
  declarations: [
    Q1Component
  ],
  imports: [
    CommonModule,
    Q1RoutingModule
  ]
})
export class Q1Module { }
