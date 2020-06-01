import { Component, OnInit } from '@angular/core';
import { EventSettingsModel , ActionEventArgs , PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import {ColorsDisplay} from 'jasmine-spec-reporter/built/display/colors-display';
import {datasource} from './datasource';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'en-US': {
    schedule: {
      newEvent: 'Add new work schedule'
    }
  }
});

@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css'],

})
export class TimetablesComponent implements OnInit {
  setDate: any;
  startHour = '07:00';
  endHour = '24:00';


  public eventSettings: EventSettingsModel = { dataSource: datasource };

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      const statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
      if (!statusElement.classList.contains('e-dropdownlist')) {
        const dropDownListObject: DropDownList = new DropDownList({
          placeholder: 'Choose status', value: statusElement.value,
          dataSource: ['New', 'Requested', 'Confirmed']
        });
        dropDownListObject.appendTo(statusElement);
        statusElement.setAttribute('name', 'EventType');
      }
      const startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
      if (!startElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
      }
      const endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
      if (!endElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
      }
    }
  }




  // matnajmch ta3ml event fil weekend
  // public onActionBegin(args: ActionEventArgs): void {
  //   const weekEnds: number[] = [0, 6];
  //   if (args.requestType === 'eventCreate' && weekEnds.indexOf((args.data[0].StartTime).getDay()) >= 0) {
  //     args.cancel = true;
  //   }
  // }
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.eventSettings);
  }


}
