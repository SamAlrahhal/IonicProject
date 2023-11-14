import { Component, OnInit } from '@angular/core';
import { Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-nav-view',
  templateUrl: './nav-view.component.html',
  styleUrls: ['./nav-view.component.scss'],
})
export class NavViewComponent implements OnInit {
  root = {
    name: 'root',
    children: [
      { name: 'file1' },
      { name: 'dir1', children: [{ name: 'file2' }, { name: 'file3' }] },
    ],
  };

  constructor() {}

  ngOnInit() {}
}
