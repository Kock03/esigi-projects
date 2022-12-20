import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { IProjects } from 'src/app/interfaces/iproject';
import { ProjectProvider } from 'src/providers/project.provider';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  displayedProjects: string[] = [
    'name',
    'client',
    'projectManagerEnvolti',
    'startDate',
    'status',
    'icon',
  ];

  filteredProjectList = new MatTableDataSource();
  projects!: IProjects[];
  project!: IProjects;
  projectId!: string;
  method: string = '';
  params: string = '';
  select: number = 1;
  token!: string;

  constructor(
    private router: Router,
    private projectsProvider: ProjectProvider,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getProjectList();
    this.initFilter();
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredProjectList.data = this.projects.filter((project) =>
          project.name
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
        this.params = this.filter.nativeElement.value;
        this.searchProjects();

      });
  }

  async searchProjects() {
    const data = {
      name: this.params,
      status: this.select,
    };
    try {
      this.filteredProjectList = await this.projectsProvider.find(data);
    } catch (error) {
      console.error(error);
    }
  }

  async selectList(ev: any) {
    this.select = ev.value;
    this.searchProjects();
  }

  createProject() {
    this.router.navigate(['projeto/tipo']);
    sessionStorage.setItem('method', 'create');
  }

  async getProjectList() {
    this.filteredProjectList.data = this.projects =
      await this.projectsProvider.findAll();
  }

  async editProject(projectSelected: any, projectId: string, customerId: any, collaboratorRequesterId: any, responsibleId: any) {
    this.method = 'edit';
    this.project = projectSelected;
    sessionStorage.setItem('customer_id', customerId);
    sessionStorage.setItem('collaboratorRequester_id', collaboratorRequesterId);
    sessionStorage.setItem('responsible_id', responsibleId);

    if (this.project.type === 3) {
      const type = 1;
      sessionStorage.setItem('project_type', type.toString());
    } else {
      sessionStorage.setItem('project_type', this.project.type.toString());
    }
    sessionStorage.setItem('project_id', projectId);
    sessionStorage.setItem('method', this.method);
    this.router.navigate([`projetos/${projectId}`]);
  }

  async deleteProject(projectId: any) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir este projeto?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          const collaborators = await this.projectsProvider.destroy(projectId);
          this.getProjectList();

          this.snackbarService.successMessage('Projeto Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
          this.getProjectList();
        }
      }
    });
  }

  goHome(): void {
    // location.replace(`http://192.168.8.184:3406/validate/${this.token}`);
    this.token = localStorage.getItem('token')!;
    location.replace(`http://localhost:3406/validate/${this.token}`)
  }
}
