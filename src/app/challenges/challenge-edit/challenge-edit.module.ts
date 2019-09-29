import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChallengeEditComponent } from '~/app/challenges/challenge-edit/challenge-edit.component';
import { SharedModule } from '~/app/shared/shared.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild([
      {
        path: '',
        component: ChallengeEditComponent
      }
    ]),
    SharedModule,
    NativeScriptFormsModule
  ],
  declarations: [ChallengeEditComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ChallengeEditModule {
}
