import {Department} from './Department';
import {Address} from './Address';
export class User {
  userId: number;
  name: string;
  gender: string;
  birthDay: Date;
  hireDay: Date;
  phone: number;
  email: string;
  departement: Department;
  adresses: Address[];


  constructor(name: string, gender: string, birthDay: Date, hireDay: Date, phone: number, email: string) {
    this.name = name;
    this.gender = gender;
    this.birthDay = birthDay;
    this.hireDay = hireDay;
    this.phone = phone;
    this.email = email;
  }


}
