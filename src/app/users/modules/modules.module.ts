import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  {
    path: "home",
    component:UserHomeComponent
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full',
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ModulesModule { }
