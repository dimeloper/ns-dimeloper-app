import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppComponent } from './app.component';
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from '~/app/app-routing.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { SharedModule } from '~/app/shared/shared.module';
import { ChallengeActionsModule } from '~/app/challenges/challenge-actions/challenge-actions.module';
import { ReactiveFormsModule } from '@angular/forms';

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    ChallengeActionsModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptUISideDrawerModule,
    ReactiveFormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    DayModalComponent,
  ],
  entryComponents: [
    DayModalComponent
  ],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
}
