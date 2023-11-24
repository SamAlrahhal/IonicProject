import { Component, OnInit } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.scss'],
})
export class SettingsBarComponent implements OnInit {
  inputValue?: string;
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {}

  // This function is called when the user clicks the "Save" button
  changeWidth() {
    const button = this.el.nativeElement.querySelector('ion-button');
    this.renderer.setStyle(button, 'width', this.inputValue + 'px');
  }
}
