import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css']
})
export class ChallengeTabsComponent implements OnInit {

  constructor(private active: ActivatedRoute,
              private router: RouterExtensions) {
  }

  ngOnInit() {
    this.router.navigate([
        {
          outlets: {
            currentChallenge: ['current-challenge'],
            today: ['today']
          }
        }
      ],
      {
        relativeTo: this.active
      });
  }

}
