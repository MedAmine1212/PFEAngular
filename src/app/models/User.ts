import {Department} from './Department';
import {Address} from './Address';
import {Post} from './Post';
export class User {
  userId: number;
  cin: string;
  name: string;
  firstName: string;
  gender: string;
  birthDay: Date;
  hireDay: Date;
  phone: number;
  email: string;
  departement: Department;
  addresses: Address[];
  post: Post;

  }
