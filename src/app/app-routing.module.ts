import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './admin/login/login.component';

// import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../app/admin/sign-up/sign-up.component';
import { DashboardComponent } from '../app/admin/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../app/admin/forgot-password/forgot-password.component';

import { VerifyEmailComponent } from '../app/admin/verify-email/verify-email.component';
import { HomeComponent } from './maincomponents/home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MainComponent } from './maincomponents/main/main.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'todo', component: MainComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
