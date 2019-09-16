import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { UiService } from '~/app/shared/ui/ui.service';
import { Subscription } from 'rxjs';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  selector: 'ns-app',
  moduleId: module.id,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(RadSideDrawerComponent, null) drawerComponent: RadSideDrawerComponent;

  private drawerSub: Subscription;
  private drawer: RadSideDrawer;

  constructor(private changeDetectionRef: ChangeDetectorRef,
              private uiService: UiService,
              private vcRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.drawerSub = this.uiService.drawerState
      .subscribe(() => {
        if (this.drawer) {
          this.drawerComponent.sideDrawer.toggleDrawerState();
        }
      });
    this.uiService.setRootVCRef(this.vcRef);
  }

  ngAfterViewInit(): void {
    this.drawer = this.drawerComponent.sideDrawer;
    this.changeDetectionRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.drawerSub.unsubscribe();
  }

  onLogout() {
    this.uiService.toggleDrawer();
  }
}
