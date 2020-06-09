import {Planning} from './Planning';

export class Schedule {
  scheduleId: number;
  startHour: number;
  endHour: number;
  pauseTime: boolean;
  pauseStart: number;
  pauseEnd: number;
  plannings: Planning [];
}
