import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LoginComponent } from './admin/login/login.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';

import {AuthService} from './shared/services/auth.service';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './maincomponents/home/home.component'
var firebaseConfig = {
  apiKey: 'AIzaSyCEVeGO5xaica798f1Z_2s8OBI4Rgh7kWk',
  authDomain: 'todo-angular-d2f25.firebaseapp.com',
  databaseURL: 'https://todo-angular-d2f25.firebaseio.com',
  projectId: 'todo-angular-d2f25',
  storageBucket: 'todo-angular-d2f25.appspot.com',
  messagingSenderId: '629218939485',
  appId: '1:629218939485:web:7e69bbf53e24b55210f3b4',
  measurementId: 'G-S685129VGM',
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,


  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
