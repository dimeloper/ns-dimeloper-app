import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Challenge } from '~/app/challenges/challenge.model';
import { DayStatus } from '~/app/challenges/day.model';
import { take } from 'rxjs/internal/operators';

@Injectable({providedIn: 'root'})
export class ChallengeService {
  private _currentChallenge = new BehaviorSubject<Challenge>(null);

  createNewChallenge(title: string, description: string) {
    const newChallenge = new Challenge(
      title,
      description,
      new Date().getFullYear(),
      new Date().getMonth()
    );

    // Save to server

    this._currentChallenge.next(newChallenge);
  }

  get currentChallenge() {
    return this._currentChallenge.asObservable();
  }

  updateDayStatus(dayInMonth: number, status: DayStatus) {
    this._currentChallenge.pipe(
      take(1)
    ).subscribe(challenge => {
      if (!challenge || challenge.days.length < dayInMonth) {
        return;
      }

      const dayIndex = challenge.days
        .findIndex(d => d.dayInMonth === dayInMonth);

      challenge.days[dayIndex].status = status;
      this._currentChallenge.next(challenge);
      console.log(challenge.days[dayIndex]);
      // Save this to server
    });
  }
}
