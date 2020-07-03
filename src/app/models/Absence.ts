import {User} from './User';

export class Absence {
  idAbsence: number;
  absenceDate: Date;
  absenceType: string;
  reason: string;
  reasonStatus: string;
  revisedBy: string;
  absentMinutes: number;
  user: User;
}