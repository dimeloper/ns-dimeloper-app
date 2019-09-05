import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { Routes } from '@angular/router';
import { AuthComponent } from '~/app/auth/auth.component';
import { TodayComponent } from '~/app/challenges/today/today.component';
import { CurrentChallengeComponent } from '~/app/challenges/current-challenge/current-challenge.component';
import { ChallengeEditComponent } from '~/app/challenges/challenge-edit/challenge-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'current-challenge',
    component: CurrentChallengeComponent
  },
  {
    path: 'edit-challenge',
    component: ChallengeEditComponent
  },
  {
    path: 'today',
    component: TodayComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
