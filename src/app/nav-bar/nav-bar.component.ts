import { Component, OnInit } from '@angular/core';
import { SharedEventsService } from '../shared-events.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(private serviceEvent: SharedEventsService) {}

  ngOnInit() {}

  goBack() {
    //window.history.back();
    this.serviceEvent.goBack();
  }

  goForward() {
    //window.history.forward();
  }
}
