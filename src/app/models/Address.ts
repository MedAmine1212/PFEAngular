import {User} from './User';
export class Address {
  addressId: number;
  streetName: string;
  streetNumber: string;
  state: string;
  governorate: string;
  zipCode: number;
  user: User;

}
