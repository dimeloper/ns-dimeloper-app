import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { Routes } from '@angular/router';
import { AuthComponent } from '~/app/auth/auth.component';
import { TodayComponent } from '~/app/challenges/today/today.component';
import { CurrentChallengeComponent } from '~/app/challenges/current-challenge/current-challenge.component';
import { ChallengeEditComponent } from '~/app/challenges/challenge-edit/challenge-edit.component';
import { ChallengeTabsComponent } from '~/app/challenges/challenge-tabs/challenge-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'challenges',
    component: ChallengeTabsComponent,
    children: [
      {
        path: 'current-challenge',
        component: CurrentChallengeComponent,
        outlet: 'currentChallenge'
      },
      {
        path: 'today',
        component: TodayComponent,
        outlet: 'today'
      }
    ]
  },
  {
    path: 'edit-challenge',
    component: ChallengeEditComponent
  },

];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
