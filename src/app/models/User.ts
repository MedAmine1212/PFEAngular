import {Department} from './Department';
import {Address} from './Address';
import {Post} from './Post';
import {UserConfigs} from './UserConfigs';
import {NotificationMessage} from './NotificationMessage';
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
  password: string;
  department: Department;
  addresses: Address[];
  post: Post;
  userConfigs: UserConfigs[];
  image: string;
  notificationMessages: NotificationMessage[];
  }
