import { Component } from '@angular/core';

@Component({
  selector: 'ns-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent {

  constructor() {
  }

  onChallengeActionSelected(action: 'complete' | 'fail' | 'cancel') {
    console.log(action);
  }
}
