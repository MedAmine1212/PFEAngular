import {User} from './User';
export class Address {
  addressId: number;
  streetName: string;
  streetNum: number;
  state: string;
  governorat: string;
  zipCode: number;
  user: User;


  constructor(streetName: string, streetNum: number, state: string, governorat: string, zipCode: number, user: User) {
    this.streetName = streetName;
    this.streetNum = streetNum;
    this.state = state;
    this.governorat = governorat;
    this.zipCode = zipCode;
    this.user = user;
  }

}
