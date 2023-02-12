import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: "home",
    component:UserHomeComponent
  },
  {
    path: "about",
    component:AboutComponent
  },
  {
    path: "contact",
    component:ContactComponent
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
