import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { ChallengeService } from '~/app/challenges/challenge.service';

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.scss']
})
export class ChallengeTabsComponent implements OnInit {
  isLoading = false;

  constructor(private active: ActivatedRoute,
              private challengeService: ChallengeService,
              private page: Page,
              private router: RouterExtensions) {
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.isLoading = true;
    this.challengeService.fetchCurrentChallenge()
      .subscribe(response => {
        console.log('Fetched Challenge..');
        this.loadTabRoutes();
      }, error => {
        console.error(error);
        this.loadTabRoutes();
      });
  }

  private loadTabRoutes() {
    setTimeout(() => {
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

      this.isLoading = false;
    }, 1000);
  }

}
