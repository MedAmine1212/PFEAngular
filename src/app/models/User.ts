import {Department} from './Department';
import {Address} from './Address';
import {Post} from './Post';
export class User {
  userId: number;
  CIN: string;
  name: string;
  firstName: string;
  gender: string;
  birthDay: Date;
  hireDay: Date;
  phone: string;
  email: string;
  department: Department;
  addresses: Address[];
  post: Post;

  }
