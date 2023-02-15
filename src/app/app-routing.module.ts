import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetDataComponent } from './get-data/get-data.component';

const routes: Routes = [
  {
    path: 'get',
    component: GetDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
