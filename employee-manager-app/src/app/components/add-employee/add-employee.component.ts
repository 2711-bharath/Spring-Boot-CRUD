import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm: any;
  formSubmitted: boolean;
  id: string;
  formLoaded: boolean;

  constructor(private formBuilder: FormBuilder, private empService: EmployeeService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.formSubmitted = false;
    this.formLoaded = false;
    this.id =this.route.snapshot.paramMap.get("id");
    if(this.id == null) {
      let employee: Employee;
      this.createForm(employee);
    } else {
      this.empService.findEmployee(this.id).subscribe(res => {
        this.createForm(res);
      })
    }
  }

  createForm(employee: Employee): void {
    if (employee) {
      this.employeeForm = this.formBuilder.group({
          id: [employee.id,],
          name: [employee.name, [Validators.required, Validators.minLength(3)]],
          email: [employee.email, [Validators.required, Validators.email]],
          jobTitle: [employee.jobTitle, [Validators.required, Validators.minLength(3)]],
          phone: [employee.phone, [Validators.required]],
          imageUrl: [employee.imageUrl, [Validators.required]],
          employeeCode: [employee.employeeCode]
      });
    } else {
      this.employeeForm = this.formBuilder.group({
        id: ['',],
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        jobTitle: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required]],
        imageUrl: ['', [Validators.required]],
        employeeCode: ['']
    });
    }
    this.formLoaded = true;
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get email() {
    return this.employeeForm.get('email');
  }
  
  get jobTitle() {
    return this.employeeForm.get('jobTitle');
  }

  get phone() {
    return this.employeeForm.get('phone');
  }
  
  get imageUrl() {
    return this.employeeForm.get('imageUrl');
  }

  onSubmit():void {
    if (!this.employeeForm.valid) {
      this.formSubmitted = true;
    } else {
      var employee: Employee = this.employeeForm.value;
      if(this.id != null) {
        this.empService.updateEmployee(employee).subscribe(res => {
          this.router.navigateByUrl("employee/all");
        })
      } else {
        this.empService.addEmployee(employee).subscribe(res => {
          this.router.navigateByUrl("employee/all");
        });
      }
    }
  }

}
