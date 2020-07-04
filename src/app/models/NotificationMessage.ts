import {User} from './User';

export class NotificationMessage {
  notifId: number;
  notifTitle: string;
  notifDesc: string;
  notifDate: Date;
  isViewed: boolean;
  isHovered: boolean;
  user: User;
  idTarget: number;
}
