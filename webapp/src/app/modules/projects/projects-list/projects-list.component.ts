import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProjects } from 'src/app/interfaces/iproject';
import { ProjectProvider } from 'src/providers/project.provider';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  displayedProjects: string[] = [
    'type',
    'name',
    'client',
    'managerEnvoltiProjectManager',
    'icon',
  ];

  filteredProjectList = new MatTableDataSource();
  projects!: IProjects[];
  project!: any;
  projectId!: string;

  constructor(
    private router: Router,
    private projectsProvider: ProjectProvider
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProjectList();
  }

  createProject() {
    this.router.navigate(['projeto/tipo']);
  }

  async getProjectList() {
    this.filteredProjectList.data = this.projects =
      await this.projectsProvider.findAll();
  }

  async editProject(projectSelected: any) {
    this.project = projectSelected;
    sessionStorage.setItem('project_type', this.project.type.toString());
  }
}
