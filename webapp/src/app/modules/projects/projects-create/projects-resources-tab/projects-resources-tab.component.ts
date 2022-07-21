import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivityProvider } from 'src/providers/activity.provider';
import { ProjectProvider } from 'src/providers/project.provider';
import { ProjectActivityDialog } from './projects-activities-dialog.component';
import { ProjectResourceDialog } from './projects-resources-dialog.component';
import { ResourceProvider } from 'src/providers/resource.provider';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-projects-resources-tab',
  templateUrl: './projects-resources-tab.component.html',
  styleUrls: ['./projects-resources-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsResourcesTabComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('activityTable') activityTable!: MatTable<any>;

  displayedColumns: string[] = [
    'name',
    'startDate',
    'endDate',
    'resources',
    'icon',
  ];

  data: [] = [];
  activityForm!: FormGroup;

  index: any = null;
  activity: any;
  projectId!: string | null;
  activityId!: string | null;
  method: string = '';
  tab!: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private projectProvider: ProjectProvider,
    private activityProvider: ActivityProvider,
    private resourceProvider: ResourceProvider,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService
  ) { }

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    if (this.method === 'edit') {
      this.getActivityList();
    }
  }
  async getActivityList() {
    this.projectId = sessionStorage.getItem('project_id');
    const activity = await this.projectProvider.findOne(this.projectId);
    this.data = activity.activities;
    console.log(this.data);
  }

  async getResourceList() {
    // TODO - Revisar a mesma questão de mapeamento e uso de dados aqui
    this.projectId = sessionStorage.getItem('project_id');
    const ressource = await this.resourceProvider.findOne(this.projectId);
    this.data = ressource.ressources;
    console.log(this.data);
  }

  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(ProjectActivityDialog, {
      width: '565px',
      height: '250px',
    });

    dialogRef.afterClosed().subscribe((activity) => {
      if (activity) {
        this.getActivityList();
      }
    });
  }

  openDialogResources(id: string) {
    this.activityId = id;
    sessionStorage.setItem('activity_id', this.activityId);
    const dialogRef = this.dialog.open(ProjectResourceDialog, {
      width: '100%',
      maxWidth: '1000px',
      height: '100%',
      maxHeight: '510px',
    });
  }

  async getActivity(activitySelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.activityId = id;
    sessionStorage.setItem('activity_id', this.activityId);
    const dialogRef = this.dialog.open(ProjectActivityDialog, {
      width: '565px',
      height: '250px',
      data: activitySelected,
    });

    dialogRef.afterClosed().subscribe((activity) => {
      if (activity) {
        this.getActivityList();
      }
    });
  }

  async deleteActivity(id: string) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir esta atividade?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          let deleteActivity = await this.activityProvider.destroy(id);
          this.getActivityList();

          this.snackbarService.successMessage('Atividade Excluida Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
          this.getActivityList();
        }
      }
    });
  }

  next() {
    this.onChange.next(true);
  }
}
