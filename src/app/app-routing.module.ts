import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'q1', loadChildren: () => import('./q1/q1.module').then(m => m.Q1Module) }, { path: 'q2', loadChildren: () => import('./q2/q2.module').then(m => m.Q2Module) }, { path: 'q3', loadChildren: () => import('./q3/q3.module').then(m => m.Q3Module) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
