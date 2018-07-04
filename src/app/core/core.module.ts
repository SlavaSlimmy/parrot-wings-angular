import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthService } from './auth/auth.service';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AuthGuard } from './guards/auth.guard';

import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        auth: authReducer
      }
    ),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),    
  ],
  declarations: [],
  providers: [AuthService, LoggedInGuard, AuthGuard]
})
export class CoreModule { 
    /* make sure CoreModule is imported only by one NgModule the AppModule */
    constructor (
      @Optional() @SkipSelf() parentModule: CoreModule
    ) {
      if (parentModule) {
        throw new Error('CoreModule is already loaded. Import only in AppModule');
      }
    }
}
