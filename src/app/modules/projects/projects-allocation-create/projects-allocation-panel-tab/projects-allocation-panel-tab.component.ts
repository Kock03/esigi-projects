import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';



export interface Panel {
  resource: string,
  hoursRun: string,
  status: string,
}

@Component({
  selector: 'app-projects-allocation-panel-tab',
  templateUrl: './projects-allocation-panel-tab.component.html',
  styleUrls: ['./projects-allocation-panel-tab.component.scss']
})
export class ProjectsAllocationPanelTabComponent implements OnInit {
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
