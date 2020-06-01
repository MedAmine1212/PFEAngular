import {Planning} from './Planning';

export class Schedule {
  scheduleId: number;
  scheduleName: string;
  scheduleDesc: string;
  startHour: number;
  endHour: number;
  repeatCycle: number;
  color: string;
  colorIcon: string;
  pauseTime: boolean;
  pauseStart: number;
  pauseEnd: number;
  showSch: boolean;
  planning: Planning [];
}
