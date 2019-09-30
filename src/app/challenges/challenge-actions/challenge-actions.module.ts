import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChallengeActionsComponent } from '~/app/challenges/challenge-actions/challenge-actions.component';

@NgModule({
  exports: [ChallengeActionsComponent],
  declarations: [ChallengeActionsComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeActionsModule {
}
