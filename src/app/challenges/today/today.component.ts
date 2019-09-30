import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChallengeService } from '~/app/challenges/challenge.service';
import { Day, DayStatus } from '~/app/challenges/day.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy {
  currentDay: Day;

  private subSink: Subscription = new Subscription();

  constructor(private challengeService: ChallengeService) {

  }

  ngOnInit(): void {
    this.subSink = this.challengeService.currentChallenge.subscribe(challenge => {
      if (challenge) {
        this.currentDay = challenge.currentDay;
      }
    });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  onChallengeActionSelected(action: DayStatus) {
    this.challengeService.updateDayStatus(this.currentDay.dayInMonth, action);
  }
}
