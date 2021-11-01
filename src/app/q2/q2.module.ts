import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Q2RoutingModule } from './q2-routing.module';
import { AutocompleteComponent } from './q2.component';
@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, HttpClientModule, Q2RoutingModule]
})
export class Q2Module {}
