import {Department} from './Department';
import {Address} from './Address';
import {Post} from './Post';
export class User {
  userId: number;
  cin: string;
  name: string;
  firstName: string;
  gender: string;
  birthDate: string;
  hireDay: Date;
  phone: string;
  email: string;
  department: Department;
  addresses: Address[];
  post: Post;

  }
