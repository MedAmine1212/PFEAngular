import {User} from './User';

export class Attendance {
  idAttendance: number;
  attendanceType: string;
  inputType: string;
  attendanceTime: number;
  attendanceDate: Date;
  user: User;
  constructor() {
  }
}
