import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  displayedProjects: string[] = [
    'type',
    'name',
    'client',
    'managerEnvoltiProjectManager',
  ];

  

  filteredProjectList = new MatTableDataSource();

  constructor() { }

  ngOnInit(): void {
  }

}
