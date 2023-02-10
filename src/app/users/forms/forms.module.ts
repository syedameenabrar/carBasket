import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ValuationComponent } from './valuation/valuation.component';

const routes: Routes = [
  {
    path: "valuation",
    component:ValuationComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FormsModule { }
