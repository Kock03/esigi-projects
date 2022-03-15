import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface Panel {
  resource: string,
  hoursRun: string,
  status: string,
}
@Component({
  selector: 'app-projects-panel-tab',
  templateUrl: './projects-panel-tab.component.html',
  styleUrls: ['./projects-panel-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsPanelTabComponent implements OnInit {
  @ViewChild('panelTable') panelTable!: MatTable<any>; 
  displayedPanel: string[] = [
    'resource',
    'hoursRun',
    'status',
  ];

  panels: Panel[] = [
    {
      resource: 'MariSol',
      hoursRun: '45hrs',
      status: 'Em andamento',
    },
  ];

  filteredPanelList!: any[] 
  

  constructor() { }

  ngOnInit(): void {
    this.filteredPanelList = this.panels;
  }

}
