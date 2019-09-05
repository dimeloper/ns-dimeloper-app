import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { isAndroid } from 'tns-core-modules/platform';
import { Page } from 'tns-core-modules/ui/page';

declare var android;

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css'],
    moduleId: module.id
})
export class CurrentChallengeComponent {
    constructor(private router: RouterExtensions, private page: Page) {

    }

    onEdit() {
        this.router.navigate(['/edit-challenge']);
    }

    onLoadedActionBar() {
        if (isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const backButton = androidToolbar.getNavigationIcon();
            if (backButton) {
                backButton.setColorFilter(android.graphics.Color.parseColor('#171717'),
                    (<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
            }
        }
    }
}
