import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { from } from 'rxjs';
import { SteamidFormComponent } from './steamid-form/steamid-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompareUsersComponent } from './compare-users/compare-users.component';
@NgModule({
  declarations: [
    AppComponent,
    SteamidFormComponent,
    CompareUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
