import { Component, Input } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular';
import { UiService } from '~/app/shared/ui/ui.service';

declare var android;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent {
  @Input() title: string;
  @Input() showBackButton = true;

  constructor(private page: Page,
              private router: RouterExtensions,
              private uiService: UiService) {
  }

  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }

  get osIsAndroid() {
    return isAndroid;
  }

  onGoBack() {
    this.router.backToPreviousPage();
  }

  onToggleMenu() {
    this.uiService.toggleDrawer();
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
