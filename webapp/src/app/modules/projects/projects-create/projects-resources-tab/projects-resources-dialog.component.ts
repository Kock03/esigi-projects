import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatTable } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ICollaborator } from 'src/app/interfaces/icollaborator';
import { IResource } from 'src/app/interfaces/iresource';
import { ActivityProvider } from 'src/providers/activity.provider';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { ResourceProvider } from 'src/providers/resource.provider';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-projects-resources-dialog',
  templateUrl: 'projects-resources-dialog.html',
  styleUrls: ['projects-resources-dialog.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectResourceDialog {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('resourceTable') resourceTable!: MatTable<any>;
  @ViewChild('accordion', { static: true }) Accordion!: MatAccordion;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  displayedColumns: string[] = [
    'collaboratorId',
    'paper',
    'estimatedHours',
    'icon',
  ];
  resourceForm!: FormGroup;
  step = 0;

  collaborators!: ICollaborator[] | any[];
  filteredCollaborators?: any[];

  index: any = null;
  resource!: IResource;
  accordion: any;
  dataTable: [] = [];
  activityId!: string;
  method: string = '';
  resourceId!: string | null;
  filteredCollaboratorList: any;
  collaborator!: ICollaborator;
  collaboratorControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<ProjectResourceDialog>,
    private fb: FormBuilder,
    private activityProvider: ActivityProvider,
    private resourceProvider: ResourceProvider,
    private collaboratorProvider: CollaboratorProvider,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // TODO - pensar para limitar a busca inicial em uma determinada quantidade
    this.getCollaboratorList();
    this.activityId = sessionStorage.getItem('activity_id')!;
    this.getResourceList();
    this.initForm();
    this.initFilter();
  }

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.shortListCollaborators();

    console.log(this.filteredCollaboratorList)
  }

  private initFilter() {
    this.collaboratorControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filter(res);
      });
  }

  displayFn(user: any): string {
    if (typeof user === 'string' && this.collaborators) {
      return this.collaborators.find(
        (collaborator) => collaborator.id === user
      );
    }
    return user && user.firstNameCorporateName && user.lastNameFantasyName ? user.firstNameCorporateName + ' ' + user.lastNameFantasyName
      : '';
  }

  private async _filter(name: string): Promise<void> {
    const params = `firstNameCorporateName=${name}`;
    this.filteredCollaborators = await this.collaboratorProvider.findByName(
      params
    );
  }

  initForm(): void {
    this.resourceForm = this.fb.group({
      collaboratorId: [null],
      paper: ['', Validators.required],
      estimatedHours: ['', Validators.required],
      isActive: [true],
      activity: { id: this.activityId },
    });
    if (this.dataTable) {
      this.resourceForm.patchValue(this.dataTable);
    }

    this.collaboratorControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.resourceForm.controls['collaboratorId'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });
  }

  getResource(resourceSelected: any, id: string, collaborator: string) {
    this.method = 'edit';
    this.resourceId = id;
    this.collaboratorControl.patchValue(collaborator);
    this.resourceForm.patchValue(resourceSelected);
  }

  async getResourceList() {
    const resourceList = await this.activityProvider.findOne(this.activityId);
    // TODO - Revisar, esta sendo usado atividade, porém retorna todos
    // os relacionamentos, com projeto todo aninhado, o provider
    // utilizado é de atividade, porém foi declarado uma constante
    // como se fosse uma lista de recurso. e existe dados que não
    // serão utilizados. pode se recuperar os recursos com o id da atividade
    // assim retornando apenas uma lista de recurso direta
    this.dataTable = resourceList.resource;
  }

  async saveResource() {
    const data = this.resourceForm.getRawValue();
    console.log(data);
    if (this.method === 'edit') {
      try {
        await this.resourceProvider.update(this.resourceId, data);
        this.method = '';
        this.initForm();
        this.getResourceList();
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    } else {
      try {
        await this.resourceProvider.store(data);

        this.initForm();
        this.getResourceList();
        this.collaboratorControl.reset();
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    this.method = '';
  }

  async deleteResource(id: string) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir este recurso?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          await this.resourceProvider.destroy(id);
          this.getResourceList();

          this.snackbarService.successMessage('Recurso excluido com sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao excluir');
          this.getResourceList();
        }
      }
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  onNoClick(): void {
    this.method = '';
    this.getResourceList();
    this.initForm();
    this.collaboratorControl.reset();
    this.method = '';
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}
