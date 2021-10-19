import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from './service/employee.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ViewEmployeesComponent } from './components/view-employees/view-employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ViewEmployeesComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
