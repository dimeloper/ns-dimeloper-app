import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';

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

  onHandleInput(action: string) {
    this.modalParams.closeCallback(action);
  }

}
