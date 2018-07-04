import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  LoginSuccessAction,
  LogoutAction
} from '@app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<any>) { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('jwt'));
    if (data && data.expDate) {
      let now = new Date().valueOf();
      if (now > data.expDate) { // expired token
        this.store.dispatch(new LogoutAction());
      } else {
        this.store.dispatch(new LoginSuccessAction({token: data.token}));
      }
    }
  }
}
