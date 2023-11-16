import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-nav-view',
  templateUrl: './nav-view.component.html',
  styleUrls: ['./nav-view.component.scss'],
})
export class NavViewComponent implements OnInit {
  root: any;
  loading = true;
  currentDirectory: string = '';
  selectedDirectory: string = 'selected dir';

  constructor() {}

  async ngOnInit() {
    // Read the root directory
    const result = await Filesystem.readdir({
      path: '',
      directory: Directory.ExternalStorage,
    });

    console.log('Readdir result:', JSON.stringify(result));

    // Create the root object
    this.root = {
      name: this.selectedDirectory,
      children: result.files.map((file) => ({
        name: file.name,
        isDir: file.type === 'directory' ? 'D' : 'F',
      })),
    };
    this.currentDirectory = Directory.Documents;
    console.log(this.currentDirectory);

    // Set loading state to false
    this.loading = false;
  }
}
