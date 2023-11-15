import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-nav-view',
  templateUrl: './nav-view.component.html',
  styleUrls: ['./nav-view.component.scss'],
})
export class NavViewComponent implements OnInit {
  root: any;

  constructor() {}

  async ngOnInit() {
    // Read the root directory
    const result = await Filesystem.readdir({
      path: '',
      directory: Directory.Documents,
    });

    // Create the root object
    this.root = {
      name: 'root',
      children: result.files.map((file) => ({ name: file })),
    };
  }
}
