import {Department} from './Department';
import {Address} from './Address';
import {Post} from './Post';
import {UserConfig} from "./UserConfig";
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
  userConfig: UserConfig;

  }
