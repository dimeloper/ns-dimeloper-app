import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DayStatus } from '~/app/challenges/day.model';

@Component({
  selector: 'ns-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.scss']
})
export class ChallengeActionsComponent {
  @Input() cancelText = 'Cancel';
  @Output() actionSelected = new EventEmitter<DayStatus>();

  onAction(action: 'complete' | 'fail' | 'cancel') {
    let status = DayStatus.Open;
    if (action === 'complete') {
      status = DayStatus.Completed;
    } else if (action === 'fail') {
      status = DayStatus.Failed
    }

    this.actionSelected.emit(status);
  }

}
