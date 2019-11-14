import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatTableModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatButtonToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonToggleModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonToggleModule
  ]
})
export class MaterialModule {}
