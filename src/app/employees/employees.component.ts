import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {newArray} from '@angular/compiler/src/util';
class Employee {
  private name: string;
  private checked: boolean;
  private phone: number;
  private email: string;
  private adress: string;
  private profession: string;
  get getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }

  public getChecked(): boolean {
    return this.checked;
  }

  public setChecked(value: boolean) {
    this.checked = value;
  }

  public getPhone(): number {
    return this.phone;
  }

  public setPhone(value: number) {
    this.phone = value;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(value: string) {
    this.email = value;
  }

  public getAdress(): string {
    return this.adress;
  }

  public setAdress(value: string) {
    this.adress = value;
  }

  public getProfession(): string {
    return this.profession;
  }

  public setProfession(value: string) {
    this.profession = value;
  }
}
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  searchText;
  employes: Employee[] =  [];
  employee: Employee;
  employee2: Employee;
  employee3: Employee;
  constructor(public router: Router) { }
  ngOnInit(): void {
    this.employee = new Employee();
    this.employee.setName('Khaili Med Amine');
    this.employee.setChecked(true);
    this.employee.setPhone(55850259);
    this.employee.setEmail('khaili.amine@hotmail.Fr');
    this.employee.setAdress('11 Makther street Borj Louzir Ariana');
    this.employee.setProfession('IS Devolopper');

    this.employee2 = new Employee();
    this.employee2.setName('Jadoui Bassem');
    this.employee2.setChecked(true);
    this.employee2.setPhone(55555555);
    this.employee2.setEmail('bassem@hotmail.Fr');
    this.employee2.setAdress('xx xxxx xxxxxxxx xxxxx');
    this.employee2.setProfession('IS Devolopper');

    this.employee3 = new Employee();
    this.employee3.setName('Ali');
    this.employee3.setChecked(false);
    this.employee3.setPhone(22222222);
    this.employee3.setEmail('ali@hotmail.Fr');
    this.employee3.setAdress('xx xxxx xxxxxxxx xxxxx');
    this.employee3.setProfession('IS Devolopper');

    this.employes.push(this.employee);
    this.employes.push(this.employee2);
    this.employes.push(this.employee3);
  }
}
