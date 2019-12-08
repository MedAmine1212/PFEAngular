import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../entities/user';
import {FormControl} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import {AuthenticationService} from "../../../services/auth/authentication.service";
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
  user1;
  constructor(private userService: UserService, private auth: AuthenticationService) { }

  @Output() closeAll = new EventEmitter<boolean>();

 async ngOnInit() {
   this.user1 = await this.auth.getUser();
   this.userService.findById(this.user1.idUser).subscribe(
      data => {
        console.log('user == profile ', data);
        this.user = data;
        this.date = new FormControl(new Date(this.user.dateOfBirth));
      },
      error1 => console.log(error1));
  }
  updateUser() {
    this.user.dateOfBirth = this.date.value;
    this.userService.modify(this.user1.idUser, this.user).subscribe(data => console.log(data), error => console.log(error));
    this.closeAll.emit(true);
  }

}
