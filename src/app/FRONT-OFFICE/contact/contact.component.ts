import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../services/Contact/contact.service';
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
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.message = '';
    this.email = '';
    this.thisPage = 'contact';
  }

  sendEmail() {
      this.contactService.sendEmail(this.data).subscribe(data => console.log(data), error1 => console.log(error1));;
    }
}
