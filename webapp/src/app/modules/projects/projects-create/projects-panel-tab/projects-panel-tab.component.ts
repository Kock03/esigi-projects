import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, Subject } from 'rxjs';
import { IProjects } from 'src/app/interfaces/iproject';
import { ProjectProvider } from 'src/providers/project.provider';


@Component({
  selector: 'app-projects-panel-tab',
  templateUrl: './projects-panel-tab.component.html',
  styleUrls: ['./projects-panel-tab.component.scss'],
})
export class ProjectsPanelTabComponent implements OnInit {
  @ViewChild('resourceTable') ressourceTable!: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();


  displayedPanel: string[] = ['resource', 'hours', 'status', 'icon'];
  ressource: any;


  constructor(
    private projectProvider: ProjectProvider,
    private router: Router,
  ) {}

  ngOnInit(): void{
    this.getResourceList
  }

  async getResourceList(){

  }

  ngAfterViewChecked(){
  }

 
}
