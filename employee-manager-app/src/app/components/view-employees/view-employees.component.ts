import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../model/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss']
})
export class ViewEmployeesComponent implements OnInit {

  employees: Employee[];   

  constructor(public employeeService: EmployeeService, private router: Router) {}  

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe( data => {
      this.employees = data;
    });
  }

  public deleteEmployee(empId: number): void {
    this.employeeService.deleteEmployee(empId).subscribe(response => {
      this.getEmployees();
    });
  }

  public editEmployee(empId: number): void {
    this.router.navigateByUrl("employee/update/"+empId);
  }

}
