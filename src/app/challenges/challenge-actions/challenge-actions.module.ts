import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChallengeActionsComponent } from '~/app/challenges/challenge-actions/challenge-actions.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

@NgModule({
  imports: [NativeScriptCommonModule],
  exports: [ChallengeActionsComponent],
  declarations: [ChallengeActionsComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeActionsModule {
}
