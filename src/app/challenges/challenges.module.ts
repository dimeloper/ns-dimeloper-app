import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ChallengesRoutingModule } from '~/app/challenges/challenges-routing.module';
import { ChallengeTabsComponent } from '~/app/challenges/challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from '~/app/challenges/current-challenge/current-challenge.component';
import { SharedModule } from '~/app/shared/shared.module';
import { TodayComponent } from '~/app/challenges/today/today.component';
import { ChallengeActionsModule } from '~/app/challenges/challenge-actions/challenge-actions.module';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    ChallengeActionsModule,
    ChallengesRoutingModule,
    SharedModule,
  ],
  declarations: [
    ChallengeTabsComponent,
    CurrentChallengeComponent,
    TodayComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class ChallengesModule {
}
