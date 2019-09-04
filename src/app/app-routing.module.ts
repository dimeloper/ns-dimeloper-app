import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { Routes } from '@angular/router';
import { AuthComponent } from '~/app/auth/auth.component';
import { TodayComponent } from '~/app/challenges/today/today.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent
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
