import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { Routes } from '@angular/router';
import { AuthComponent } from '~/app/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'challenges',
    loadChildren: '~/app/challenges/challenges.module#ChallengesModule'
  },

];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
