import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Q2RoutingModule } from './q2-routing.module';
import { Q2Component } from './q2.component';


@NgModule({
  declarations: [
    Q2Component
  ],
  imports: [
    CommonModule,
    Q2RoutingModule
  ]
})
export class Q2Module { }
