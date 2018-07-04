import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './modules/login';
import { SignupComponent } from './modules/signup';
import { HomeComponent } from './modules/home';

import { LoggedInGuard, AuthGuard } from '@app/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [ AuthGuard ]
  },
  { 
    path: 'signup', 
    component: SignupComponent,
    canActivate: [ AuthGuard ]
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [ LoggedInGuard ] 
  },    
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
