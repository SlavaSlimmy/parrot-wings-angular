import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  LoginRequestAction,
  LogoutAction
} from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() { }

  onLoginClick() {
    this.store.dispatch(new LoginRequestAction({ email: '', password: ''}));
  }

  onLogoutClick() {
    this.store.dispatch(new LogoutAction());
  }

}
