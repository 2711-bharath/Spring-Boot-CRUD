# Create a REST API in Spring Boot with MySQL

## Requirements

1. Maven 3.0+
2. IDE(Eclipse or IntelliJ)
3. JDK 1.8+
4. MYSQL database server
5. Postman for testing

## Overview

1. Create the Spring Boot Project from <a href="https://start.spring.io/">Spring Initializr</a>
2. Create a MySQL database and Define Database configurations
3. Create Entity model class
4. Create JPA Data Repository
5. Create Service class
6. Create Rest Controllers class
7. Build and Run the Project
8. Testing using Postman

### 1. Create the Spring Boot Project

- Create a REST service with <a href="https://start.spring.io/">Spring Initializr</a>.
- Add the following dependencies:

    1. Spring Web
    2. Spring Data JPA
    3. MySQL Driver

### 2. Create a MySQL database and Define Database configurations

- write in mysql command line
```sql
create database employeemanager
```
- Go into project folder src\main\resources\application.properties
```java
spring.jpa.hibernate.ddl-auto=update;
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:3306/employeemanager
spring.datasource.username=root
spring.datasource.password=Bharath@2711
spring.datasource.driver-class-name =com.mysql.jdbc.Driver
spring.jpa.show-sql: true
```
### 3. Create Entity model class

- Go into project folder src\main\java\com.example.projectname
- create a package name of model
- Create a class inside the package

Description 
- **@Entity** is used to that the class is an entity in the database.
- **Id** is used to the primary key of an entity
- **@GeneratedValue** is used to the specification of generation strategies for the values of primary keys
- **@Column** is used to permits the name of the column to be explicitly specified

```java
import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Employee implemenets Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTIFY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String phone;
    private String imageUrl;
    @Column(nullable = false, updatable = false)
    private String employeeCode;

    public Employee() {}

    public Employee(Long id, String name, String email, String jobTitle, String phone, String imageUrl, String employeeCode) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.jobTitle = jobTitle;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.employeeCode = employeeCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    @Override
    public String toString() {
        return "Employee = {" + "\n" +
                "Id = " + id + "\n" +
                "Name = " + name + "\n" +
                "Email = " + email + "\n" +
                "Job Title = " + jobTitle + "\n" +
                "Phone = " + phone + "\n" +
                "Image Url = " + imageUrl + "\n" + "}";
    }
}
```

### 4. Create JPA Data Repository

- Create Employee Repository interface extending JPA Repository.
- There are built-in methods for CRUD operations in JpaRepository, writing any SQL query is not needed.

- Go into project folder src\main\java\com.example.projectname
- create a package name of Repo
- Create a interface inside the package

```java
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.EmployeeManager.model.Employee;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Long>{

    void deleteEmployeeById(Long id);

    Optional<Employee> findEmployeeById(Long id);
}
```
### 5. Create Service class

- Create user defined exception
- Go into project folder src\main\java\com.example.projectname
- create a package name of exception
- Create a class inside the package

```java
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
```

- Create a Employee service class to code the business logic and it acts as a middle layer between repository and controller class.
- **@Transactional** used to annotate methods are executed in transactions.

- Go into project folder src\main\java\com.example.projectname
- create a package name of service
- Create a class inside the package

```java
import com.example.EmployeeManager.exception.UserNotFoundException;
import com.example.EmployeeManager.model.Employee;
import com.example.EmployeeManager.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class EmployeeService {
    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee) {
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmployees() {
        return employeeRepo.findAll();
    }

    public Employee findEmployeeById(Long id) {
        return employeeRepo.findEmployeeById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id "+id+" is not found"));
    }

    public Employee updateEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepo.deleteEmployeeById(id);
    }
}
```

### 6. Create Rest Controllers class

- Create Rest User Controllers class which contains all REST API endpoints for CRUD operations.

- Go into project folder src\main\java\com.example.projectname
- create a package name of controller
- Create a class inside the package

```java
import com.example.EmployeeManager.model.Employee;
import com.example.EmployeeManager.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeResource {
    private final EmployeeService employeeService;

    public EmployeeResource(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployee() {
        List<Employee> employees = employeeService.findAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id) {
        Employee employee = employeeService.findEmployeeById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.addEmployee(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee updateEmployee = employeeService.updateEmployee(employee);
        return new ResponseEntity<>(updateEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
```

### 7. Build and Run the Project

- Run EmployeeManagerApplication.java
- The app will start running at http://localhost:8080.

### 8. Testing using Postman

- Execute POST Request method to add a employee to the Database.

    <img src="https://github.com/2711-bharath/Spring-Boot-CRUD/blob/main/images/img.PNG" />

- Execute GET Request method to get all employees to the Database.

    <img src="https://github.com/2711-bharath/Spring-Boot-CRUD/blob/main/images/img1.PNG" />

- Execute GET Request method to get employee by id to the Database.

    <img src="https://github.com/2711-bharath/Spring-Boot-CRUD/blob/main/images/img2.PNG" />
