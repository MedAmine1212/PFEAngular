import {User} from './User';
export class Departement {
  depId: number;
  depName: string;
  supDep: Departement;
  cehfDep: User;
  departements: Departement[];
  users: Departement[];


  constructor(depName: string, supDep: Departement, chefDep: User) {
    this.depName = depName;
    this.supDep = supDep;
    this.cehfDep = chefDep;
  }

}
