import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../entities/user';
import {FormControl} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  minDate = new Date(1950, 0, 1);
  maxDate = new Date(2003, 0, 1);
  user: User = new User();
  date ;
  constructor(private userService: UserService) { }

  @Output() closeAll = new EventEmitter<boolean>();

  ngOnInit() {

    this.userService.findById(6).subscribe(
      data => {
        this.user = data;
        this.date = new FormControl(new Date(this.user.dateOfBirth));
      },
      error1 => console.log(error1));
  }
  updateUser() {
    this.user.dateOfBirth = this.date.value;
    this.userService.modify(6, this.user).subscribe(data => console.log(data), error => console.log(error));
    this.closeAll.emit(true);
  }

}
