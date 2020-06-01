export class Schedule {
  scheduleId: number;
  scheduleName: string;
  scheduleDesc: string;
  startHour: number;
  endHour: number;
  scheduleDays: string[];
  repeadCycle: number;
  color: string;
  pauseTime: boolean;
  pauseStart: number;
  pauseEnd: number;
}
