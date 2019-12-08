import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../services/Contact/contact.service';
import {DialogComponent} from '../register-Login/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
export class Data {
  email: string;
  message: string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  data: Data = new Data();
  thisPage: string;
  email: string;
  message: string;
  dialogComponent: MatDialogRef<DialogComponent>;
    constructor(private contactService: ContactService, private dialog: MatDialog) { }

  ngOnInit() {
    this.message = '';
    this.email = '';
    this.thisPage = 'contact';
  }

  sendEmail() {
      this.contactService.sendEmail(this.data).subscribe(data => console.log(data), error1 => console.log(error1));
      this.dialogComponent = this.dialog.open(DialogComponent, {
      width: '350px'
    });
    }
}
