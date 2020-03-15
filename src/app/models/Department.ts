import {User} from './User';
export class Department {
  depId: number;
  depName: string;
  supDep: Department;
  chefDep: number;
  departments: Department[];
  users: User[];
}
