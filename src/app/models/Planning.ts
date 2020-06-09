import {Schedule} from './Schedule';

export class Planning {
  planningId: number;
  schedule: Schedule;
  planningName: string;
  planningDescription: string;
  showPl: boolean;
  scheduleDays: string[];
  startDate: string;
  endDate: string;
  repeatCycle: number;
  color: string;
  colorIcon: string;
}
