import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmployeesComponent, AddEmployeeComponent } from './components';

const routes: Routes = [
  {path: '', redirectTo: 'employee/all', pathMatch: 'full' },
  {path: 'employee', children: [
    {path: 'all', component: ViewEmployeesComponent},
    {path: 'add', component: AddEmployeeComponent},
    {path: 'update/:id', component: AddEmployeeComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
