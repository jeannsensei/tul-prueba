import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginViewComponent } from './routes/login-view/login-view.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [LoginViewComponent, LoginFormComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
})
export class LoginModule {}
