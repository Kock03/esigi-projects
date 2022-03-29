import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, Subject } from 'rxjs';
import { IProjects } from 'src/app/interfaces/iproject';
import { ProjectProvider } from 'src/providers/project.provider';

export interface Panel {
  name: string;
  ressource: string;
  hours: string;
  status: string;
}
@Component({
  selector: 'app-projects-panel-tab',
  templateUrl: './projects-panel-tab.component.html',
  styleUrls: ['./projects-panel-tab.component.scss'],
})
export class ProjectsPanelTabComponent implements OnInit {
  @ViewChild('projectTable') projectTable!: MatTable<any>;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  projects!: IProjects[];
  filteredProjectList = new MatTableDataSource();

  displayedPanel: string[] = ['name', 'ressource', 'hours', 'status', 'icon'];

  panels: Panel[] = [
    {
      name: 'htpx',
      ressource: 'João da Silva',
      hours: '170',
      status: 'ativo',
    },
  ];

  constructor(
    private projectProvider: ProjectProvider,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProjectsList();
    this.initFilter();
  }

  ngAfterViewInit(): void {}

  async getProjectsList() {
    this.filteredProjectList.data = this.projects =
      await this.projectProvider.findAll();
    this.filteredProjectList.sort = this.sort;
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredProjectList.data = this.projects.filter((project) =>
          project.ressource
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
      });
  }
}
