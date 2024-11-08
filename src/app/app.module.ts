import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCardComponent } from './user-card/user-card.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { UserRegisterModalComponent } from './user-register-modal/user-register-modal.component';
import { DatePipe } from '@angular/common';
import { UserFilterComponent } from './user-filter/user-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserModalComponent,
    UserCardComponent,
    ConfirmDeleteComponent,
    UserRegisterModalComponent,
    UserFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
