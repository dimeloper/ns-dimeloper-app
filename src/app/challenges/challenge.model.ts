import { Day, DayStatus } from '~/app/challenges/day.model';

export class Challenge {
  constructor(public title: string,
              public description: string,
              public year: number,
              public month: number,
              private _days: Day[] = []) {
    if (_days.length > 0) {
      return;
    }

    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 1; i < daysInMonth + 1; i++) {
      const date = new Date(this.year, this.month, i);
      const dayInWeek = date.getDay();
      this._days.push({
        dayInMonth: i,
        dayInWeek, date,
        status: DayStatus.Open
      });
    }
  }

  get currentDay() {
    return this._days.find(d => d.dayInMonth === new Date().getDate());
  }

  get days() {
    return [...this._days];
  }
}
