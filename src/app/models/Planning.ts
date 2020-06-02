import {Schedule} from './Schedule';

export class Planning {
  planningId: number;
  schedule: Schedule;
  scheduleDays: string[];
  startDate: string;
  endDate: string;
  repeatCycle: number;
}
