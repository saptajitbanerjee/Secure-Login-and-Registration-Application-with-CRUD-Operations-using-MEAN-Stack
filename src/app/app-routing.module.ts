import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { Form1Component } from './form1/form1.component';
import { ContentComponent } from './content/content.component';
import { canActivate } from './auth.guard';
import { canActivate_login } from './login-guard.guard';

const routes: Routes = [
  {path:'login',component:FormComponent,canActivate:[canActivate_login]},
  {path:'register',component:Form1Component},
  {path:'content',component:ContentComponent,canActivate:[canActivate]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
