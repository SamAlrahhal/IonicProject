import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent implements OnInit {
  @Input() node: any;
  ngOnInit() {
    console.log('child: ', JSON.stringify(this.node));
  }
  selected(name: any) {
    console.log('selected', name);
  }
}

//{"files":[
//{ "name": "性处理部·安塞尔", "type": "directory", "size": 3488, "mtime": 1679546703559, "uri": "file:///storage/emulated/0/Documents/%E6%80%A7%E5%A4%84%E7%90%86%E9%83%A8%C2%B7%E5%AE%89%E5%A1%9E%E5%B0%94", "ctime": 1679546703000 },
//{ "name": "Zimon", "type": "directory", "size": 3488, "mtime": 1692348346716, "uri": "file:///storage/emulated/0/Documents/Zimon", "ctime": 1692348346000 }]}
