import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ChallengesRoutingModule } from '~/app/challenges/challenges-routing.module';
import { ChallengeTabsComponent } from '~/app/challenges/challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from '~/app/challenges/current-challenge/current-challenge.component';
import { SharedModule } from '~/app/shared/shared.module';
import { TodayComponent } from '~/app/challenges/today/today.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    ChallengesRoutingModule,
    SharedModule
  ],
  declarations: [
    ChallengeTabsComponent,
    CurrentChallengeComponent,
    TodayComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ChallengesModule {
}
