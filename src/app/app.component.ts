import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface Volunteers {
  name: string;
  reportTo?: Volunteers[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MMD';
  itVolunteers: Array<any> = [
    {
      name: "อาจารย์ โจ้",
      reportTo: [
        {
          name: "อาจารย์ โก๋",
          reportTo: [
            {
              name: "พี่ หนึ่ง"
            },
            {
              name: "เมฆ"
            }
          ]
        },
        {
          name: "อาจารย์ เฟย",
          reportTo: [
            {
              name: "พี่ ต้อง"
            },
            {
              name: "เจ้าสัว"
            }
          ]
        }
      ]
    }
  ]
  itVolunteers2: Array<any> = [
    {
      name: "อาจารย์ โจ้",
      reportTo: ""
    },
    {
      name: "โก๋",
      reportTo: "อาจารย์ โจ้"
    },
    {
      name: "เฟย",
      reportTo: "อาจารย์ โจ้"
    },
    {
      name: "หนึ่ง",
      reportTo: "โก๋"
    },
    {
      name: "เมฆ",
      reportTo: "โก๋"
    },
    {
      name: "ต้อง",
      reportTo: "เฟย"
    },
    {
      name: "เจ้าสัว",
      reportTo: "เฟย"
    }
  ]
  private _transformer = (node: Volunteers, level: number) => {
    return {
      expandable: !!node.reportTo && node.reportTo.length > 0,
      name: node.name,
      level: level,
    };
  }
  
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.reportTo);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = this.itVolunteers;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
  
}

