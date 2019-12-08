import {Component, Inject} from '@angular/core';
import {User} from '../../entities/user';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  template: `
      <h3 mat-dialog-title>Submitted successfully</h3>
      <div style="text-align: center;">
          <p>
              <button mat-button [mat-dialog-close]="" cdkFocusInitial>Ok</button>
          </p>
      </div>
  `
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
