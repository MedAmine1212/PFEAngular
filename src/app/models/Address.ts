import {User} from './User';
export class Address {
  addressId: number;
  streetName: string;
  streetNumber: number;
  state: string;
  governorate: string;
  zipCode: number;
  user: User;

}
