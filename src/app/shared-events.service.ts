import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedEventsService {
  goBackEvent = new EventEmitter();

  constructor() {}

  goBack() {
    this.goBackEvent.emit();
  }
}
