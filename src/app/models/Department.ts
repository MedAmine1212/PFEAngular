import {User} from './User';
export class Department {
  depId: number;
  depName: string;
  supDep: Department;
  chefDep: number;
  departments: Department[];
  users: User[];


  constructor(depName: string, supDep: Department, chefDep: number) {
    this.depName = depName;
    this.supDep = supDep;
    this.chefDep = chefDep;
  }

}
