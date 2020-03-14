import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Department} from '../../models/Department';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() outPutData = new EventEmitter<boolean>();
  @Input() dep: Department;
  constructor() { }

  ngOnInit(): void {
  }
  closeThis() {
    this.outPutData.emit(true);
  }
}
