import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DayStatus } from '~/app/challenges/day.model';

@Component({
  selector: 'ns-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.scss']
})
export class ChallengeActionsComponent implements OnChanges {
  @Input() cancelText = 'Cancel';
  @Output() actionSelected = new EventEmitter<DayStatus>();
  @Input() chosen: 'complete' | 'fail' = null;
  @Input() startDone = false;

  action: 'complete' | 'fail' = null;
  done = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chosen) {
      this.action = changes.chosen.currentValue;

      if (changes.chosen.currentValue === null) {
        this.done = false;
      }
    }

    if (changes.startDone) {
      if (changes.startDone.currentValue) {
        this.done = true;
      }
    }
  }

  onAction(action: 'complete' | 'fail' | 'cancel') {
    this.done = true;
    let status = DayStatus.Open;
    if (action === 'complete') {
      status = DayStatus.Completed;
      this.action = 'complete';
    } else if (action === 'fail') {
      status = DayStatus.Failed;
      this.action = 'fail';
    } else if (action === 'cancel') {
      this.action = null;
      this.done = false;
    }

    this.actionSelected.emit(status);
  }

}
