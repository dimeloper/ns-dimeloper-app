import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular';
import { DayModalComponent } from '~/app/challenges/day-modal/day-modal.component';
import { UiService } from '~/app/shared/ui/ui.service';
import { ChallengeService } from '~/app/challenges/challenge.service';
import { Challenge } from '~/app/challenges/challenge.model';
import { Subscription } from 'rxjs';
import { Day, DayStatus } from '~/app/challenges/day.model';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.common.scss',
    './current-challenge.component.scss'],
  moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  currentChallenge: Challenge = null;
  private subSink: Subscription;

  constructor(private challengeService: ChallengeService,
              private modalDialog: ModalDialogService,
              private uiService: UiService,
              private vcRef: ViewContainerRef) {

  }

  ngOnInit(): void {
    this.subSink = this.challengeService.currentChallenge
      .subscribe(challenge => {
        this.currentChallenge = challenge;
      });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  getIsSettable(dayInMonth: number) {
    return dayInMonth <= new Date().getDate();
  }

  getRow(index: number, day: { dayInMonth: number, dayInWeek: number }) {
    const startRow = 1;
    const weekRow = Math.floor(index / 7);
    const firstWeekDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1).getDay();

    const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

    return startRow + weekRow + irregularRow;
  }

  onChangeStatus(day: Day) {
    if (!this.getIsSettable(day.dayInMonth)) {
      return;
    }

    this.modalDialog.showModal(DayModalComponent, {
      fullscreen: true,
      viewContainerRef: this.uiService.getRootVCRef()
        ? this.uiService.getRootVCRef()
        : this.vcRef,
      context: {
        date: day.date,
        status: day.status
      }
    }).then((status: DayStatus) => {
      if (status === DayStatus.Open) {
        return;
      }
      this.challengeService.updateDayStatus(day.dayInMonth, status);
    });
  }
}
