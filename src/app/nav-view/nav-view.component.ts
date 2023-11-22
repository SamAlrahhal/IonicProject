import { Component, OnInit, Input } from '@angular/core';
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
  history: string[] = [];

  constructor() {}

  async ngOnInit() {
    // Check permissions
    const { publicStorage } = await Filesystem.checkPermissions();
    if (publicStorage !== 'granted') {
      await Filesystem.requestPermissions();
    }

    // Read the root directory
    const result = await Filesystem.readdir({
      path: '',
      directory: Directory.ExternalStorage,
    });

    console.log('Readdir result:', JSON.stringify(result));

    // Create the root object
    this.root = result.files;

    // Set loading state to false
    this.loading = false;
  }

  async selected(name: any) {
    console.log('selected', name);
    this.history.push(name);

    const fullPath = this.currentDirectory + '/' + name;

    // Check if the file exists
    const stat = await Filesystem.stat({
      path: fullPath,
      directory: Directory.ExternalStorage,
    });

    if (stat.type === 'file') {
      console.log('File does not exist:', fullPath);
    } else {
      // Navigate into the directory
      const result = await Filesystem.readdir({
        path: fullPath,
        directory: Directory.ExternalStorage,
      });

      console.log('Readdir result:', JSON.stringify(result));

      // Update the current directory
      this.currentDirectory = fullPath;

      // Create the root object
      this.root = result.files;
    }
  }
}
