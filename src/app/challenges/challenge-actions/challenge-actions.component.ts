import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ns-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.scss']
})
export class ChallengeActionsComponent {
  @Input() cancelText = 'Cancel';
  @Output() actionSelected = new EventEmitter<'complete' | 'fail' | 'cancel'>();

  onAction(action: 'complete' | 'fail' | 'cancel') {
    this.actionSelected.emit(action);
  }

}
