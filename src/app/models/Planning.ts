import {Schedule} from './Schedule';
import {Department} from './Department';
import {PlanningConfig} from './PlanningConfig';

export class Planning {
  planningId: number;
  schedule: Schedule;
  departments: Department[];
  planningName: string;
  planningDescription: string;
  showPl: boolean;
  scheduleDays: string[];
  startDate: string;
  endDate: string;
  repeatCycle: number;
  color: string;
  colorIcon: string;
  planningConfigs: PlanningConfig[];
}
