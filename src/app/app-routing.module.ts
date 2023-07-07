import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'addemployee', component: AddemployeeComponent},
  {path: 'update/:id', component: AddemployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
