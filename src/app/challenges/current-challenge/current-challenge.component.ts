import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular';
import { DayModalComponent } from '~/app/challenges/day-modal/day-modal.component';
import { UiService } from '~/app/shared/ui/ui.service';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.common.scss',
    './current-challenge.component.scss'],
  moduleId: module.id
})
export class CurrentChallengeComponent {
  constructor(private modalDialog: ModalDialogService,
              private uiService: UiService,
              private vcRef: ViewContainerRef) {

  }

  onChangeStatus() {
    this.modalDialog.showModal(DayModalComponent, {
      fullscreen: true,
      viewContainerRef: this.uiService.getRootVCRef()
        ? this.uiService.getRootVCRef()
        : this.vcRef,
      context: {
        date: new Date()
      }
    }).then((action: string) => {
      console.log(action);
    });
  }
}
