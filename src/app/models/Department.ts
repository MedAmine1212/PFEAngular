import {User} from './User';
import {Planning} from './Planning';
export class Department {
  depId: number;
  depName: string;
  supDep: Department;
  chefDep: number;
  departments: Department[];
  users: User[];
  planning: Planning;
}
