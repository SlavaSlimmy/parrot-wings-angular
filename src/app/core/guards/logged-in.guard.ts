import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { getIsAuthenticated } from '../auth/auth.reducer';

@Injectable()
export class LoggedInGuard implements CanActivate {
  isAuthenticated = false;

  constructor(private router:Router, private store: Store<any>) {
    this.store.select(getIsAuthenticated)
      .subscribe(isLoggedin => {
        this.isAuthenticated = isLoggedin;
      })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('canActivate', this.isAuthenticated);
      if (!this.isAuthenticated) {
        this.router.navigate(['/login']);
      }
      return this.isAuthenticated;
  }
}
