import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';


export interface Panel {
  ressource: string;
  hours: string;
  status: string;
}
@Component({
  selector: 'app-projects-panel-tab',
  templateUrl: './projects-panel-tab.component.html',
  styleUrls: ['./projects-panel-tab.component.scss']
})
export class ProjectsPanelTabComponent implements OnInit {
  @ViewChild('projectTable') projectTable!: MatTable<any>;

  displayedPanel: string[] = [
    'ressource',
    'hours',
    'status',
  ];

  panels: Panel[] = [
    {
      ressource: 'João da Silva',
      hours: '170',
      status: 'ativo',
    },
  ];

  filteredProjectPanelList!: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
