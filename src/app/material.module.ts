import {NgModule} from '@angular/core';


import {MatButtonModule, MatGridList, MatInputModule, MatNativeDateModule, MatToolbarModule} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule ,
    MatInputModule,
    MatNativeDateModule,


  ],
  imports: [
    MatToolbarModule
  ]
})

export class MaterialModule {}
