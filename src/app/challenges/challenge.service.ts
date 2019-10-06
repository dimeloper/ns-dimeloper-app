import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Challenge } from '~/app/challenges/challenge.model';
import { Day, DayStatus } from '~/app/challenges/day.model';
import { switchMap, take, tap } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '~/app/auth/auth.service';

@Injectable({providedIn: 'root'})
export class ChallengeService {
  private _currentChallenge = new BehaviorSubject<Challenge>(null);
  private firebaseUrl = 'https://REPLACE-WITH-FIREBASE-APP-ID.firebaseio.com/challenge.json';

  constructor(private authService: AuthService, private httpClient: HttpClient) {
  }

  createNewChallenge(title: string, description: string) {
    const newChallenge = new Challenge(
      title,
      description,
      new Date().getFullYear(),
      new Date().getMonth()
    );

    this.syncChallengeToServer(newChallenge);
  }

  updateChallenge(title: string, description: string) {
    this._currentChallenge.pipe(
      take(1)
    ).subscribe(challenge => {
      const updatedChallenge = new Challenge(title, description, challenge.year, challenge.month, challenge.days);

      this.syncChallengeToServer(updatedChallenge);
    });
  }

  get currentChallenge() {
    return this._currentChallenge.asObservable();
  }

  fetchCurrentChallenge() {
    return this.authService.user.pipe(
      take(1),
      switchMap(currentUser => {
        if (!currentUser || !currentUser.isAuth) {
          return of(null);
        }
        return this.httpClient
          .get<{ title: string, description: string, month: number, year: number, _days: Day[] }>(this.firebaseUrl + currentUser.token);
      }),
      tap(resData => {
        if (resData) {
          const loadedChallenge = new Challenge(
            resData.title, resData.description, resData.month, resData.year, resData._days
          );
          this._currentChallenge.next(loadedChallenge);
        }
      })
    );
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

      this.syncChallengeToServer(challenge);
    });
  }

  private syncChallengeToServer(challenge: Challenge) {
    return this.authService.user.pipe(
      take(1),
      switchMap(currentUser => {
        if (!currentUser || !currentUser.isAuth) {
          return of(null);
        }
        return this.httpClient.put(this.firebaseUrl + currentUser.token, challenge)
      })
    ).subscribe(response => {
      console.log(response);
      this._currentChallenge.next(challenge);
    })
  }
}
