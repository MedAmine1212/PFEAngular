import {Department} from './Department';
import {Address} from './Address';
export class User {
  userId: number;
  name: string;
  firstName: string;
  gender: string;
  birthDay: Date;
  hireDay: Date;
  phone: number;
  email: string;
  departement: Department;
  addresses: Address[];

  }
