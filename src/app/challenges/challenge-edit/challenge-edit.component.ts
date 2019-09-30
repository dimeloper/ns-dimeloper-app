import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular';
import { ChallengeService } from '~/app/challenges/challenge.service';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss'],
  moduleId: module.id
})
export class ChallengeEditComponent implements OnInit {
  isCreating = true;

  constructor(private challengeService: ChallengeService,
              private router: RouterExtensions,
              private pageRoute: PageRoute) {
  }

  ngOnInit(): void {
    this.pageRoute.activatedRoute.subscribe(activatedRoute => {
      activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('mode')) {
          this.isCreating = true;
        } else {
          this.isCreating = paramMap.get('mode') !== 'edit';
        }
      });
    });
  }

  onSubmit(title: string, description: string) {
    this.challengeService.createNewChallenge(title, description);
    this.router.backToPreviousPage();
  }

}
