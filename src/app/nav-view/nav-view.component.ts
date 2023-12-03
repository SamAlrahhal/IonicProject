import { Component, OnInit, Input } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { SharedEventsService } from '../shared-events.service';
import { EventEmitter } from '@angular/core';

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
  forwardHistory: string[] = [];
  fullPathS: string = '';

  constructor(private serviceEvent: SharedEventsService) {}

  async ngOnInit() {
    // Check permissions
    const { publicStorage } = await Filesystem.checkPermissions();
    if (publicStorage !== 'granted') {
      await Filesystem.requestPermissions();
    }

    this.serviceEvent.makeFileEvent.subscribe((name: string) => {
      this.makeFile(name);
    });
    this.serviceEvent.goForwardEvent.subscribe(() => {
      this.goForward();
    });

    // Subscribe to the goBackEvent
    this.serviceEvent.goBackEvent.subscribe(() => {
      this.goBack();
    });
    this.history.push('');

    // Read the root directory
    const result = await Filesystem.readdir({
      path: '',
      directory: Directory.ExternalStorage,
    });

    // Create the root object
    this.root = result.files;

    // Set loading state to false
    this.loading = false;
  }

  async makeFile(name: string) {
    // Convert the history array to a string
    const historyString = this.history.join('\n');

    const base64Data = btoa(historyString);

    // Write the history string to a file
    await Filesystem.writeFile({
      path: this.currentDirectory + '/' + name,
      data: base64Data,
      directory: Directory.ExternalStorage,
    });

    // Refresh the current directory
    const result = await Filesystem.readdir({
      path: this.currentDirectory,
      directory: Directory.ExternalStorage,
    });

    this.root = result.files;
  }

  async goBack() {
    if (this.history.length <= 1) {
      return;
    }
    this.history.pop();
    this.currentDirectory = this.history[this.history.length - 1];

    const result = await Filesystem.readdir({
      path: this.currentDirectory,
      directory: Directory.ExternalStorage,
    });

    this.root = result.files;
  }

  async goForward() {
    if (this.forwardHistory.length > 0) {
      const nextDir = this.forwardHistory.pop();

      if (nextDir) {
        this.history.push(nextDir);

        const result = await Filesystem.readdir({
          path: nextDir,
          directory: Directory.ExternalStorage,
        });

        this.currentDirectory = nextDir;
        this.root = result.files;
      }
    }
  }

  async selected(name: any) {
    const fullPath = this.currentDirectory + '/' + name;
    this.history.push(fullPath);
    this.forwardHistory.push(fullPath);

    this.fullPathS = fullPath;

    // Check if the file exists
    const stat = await Filesystem.stat({
      path: fullPath,
      directory: Directory.ExternalStorage,
    });

    if (stat.type === 'file') {
    } else {
      // Navigate into the directory
      const result = await Filesystem.readdir({
        path: fullPath,
        directory: Directory.ExternalStorage,
      });

      // Update the current directory
      this.currentDirectory = fullPath;

      // Create the root object
      this.root = result.files;
    }
  }
}
