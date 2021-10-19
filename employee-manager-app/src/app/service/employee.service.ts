import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class EmployeeService {

    private apiServerUrl: string;  

    constructor(private http: HttpClient){
        this.apiServerUrl = environment.apiBaseUrl;
    }

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerUrl}/all`);
    }

    public findEmployee(empId: string): Observable<Employee> {
        return this.http.get<Employee>(`${this.apiServerUrl}/find/${empId}`);
    }

    public addEmployee( employee: Employee ): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiServerUrl}/add`, employee);
    }

    public updateEmployee( employee: Employee ): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerUrl}/update`, employee);
    }

    public deleteEmployee( employeeId: number ): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/delete/${employeeId}`);
    }
}
