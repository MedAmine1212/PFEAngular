import {User} from './User';
export class Department {
  depId: number;
  depName: string;
  supDep: Department;
  chefDep: User;
  departements: Department[];
  users: Department[];


  constructor(depName: string, supDep: Department, chefDep: User) {
    this.depName = depName;
    this.supDep = supDep;
    this.chefDep = chefDep;
  }

}
