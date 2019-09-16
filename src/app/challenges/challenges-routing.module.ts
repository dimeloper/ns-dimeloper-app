import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { Routes } from '@angular/router';
import { ChallengeTabsComponent } from '~/app/challenges/challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from '~/app/challenges/current-challenge/current-challenge.component';
import { TodayComponent } from '~/app/challenges/today/today.component';

const routes: Routes = [
  {
    path: 'tabs',
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
      },
    ]
  },
  {
    path: ':mode',
    loadChildren: '~/app/challenges/challenge-edit/challenge-edit.module#ChallengeEditModule'
  },
  {
    path: '',
    redirectTo: '/challenges/tabs',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class ChallengesRoutingModule {
}
