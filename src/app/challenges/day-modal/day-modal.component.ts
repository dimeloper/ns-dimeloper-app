import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { DayStatus } from '~/app/challenges/day.model';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {

  loadedDate: Date;

  constructor(private modalParams: ModalDialogParams) {
  }

  ngOnInit() {
    this.loadedDate = (this.modalParams.context as { date: Date }).date;
  }

  onHandleInput(action: DayStatus) {
    this.modalParams.closeCallback(action);
  }

}
