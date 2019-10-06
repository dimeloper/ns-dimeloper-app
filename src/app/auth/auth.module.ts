import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '~/app/shared/shared.module';
import { AuthComponent } from '~/app/auth/auth.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      }
    ]),
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [],
  declarations: [AuthComponent],
  providers: [],
})
export class AuthModule {
}
