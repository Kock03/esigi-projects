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
import { ConfigProvider } from 'src/providers/config-provider';
import { ResourceProvider } from 'src/providers/resource.provider';
import { RequireMatch } from 'src/services/autocomplete.service';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';
import { ErrorStateMatcherService } from 'src/services/error.state.matcher.service';
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
    'isActive',
    'icon',
  ];
  resourceForm!: FormGroup;
  step = 0;

  collaborators!: ICollaborator[] | any[];
  filteredCollaborators?: any[];

  papers: any[] = []
  index: any = null;
  resource!: IResource;
  accordion: any;
  dataTable: any[] = [];
  activityId!: string;
  method: string = '';
  resourceId!: string | null;
  filteredCollaboratorList: any;
  collaborator!: ICollaborator;
  collaboratorControl = new FormControl('', [Validators.required, RequireMatch]);
  collaboratorValid: boolean = false;
  matcher = new ErrorStateMatcherService();


  constructor(
    public dialogRef: MatDialogRef<ProjectResourceDialog>,
    private fb: FormBuilder,
    private activityProvider: ActivityProvider,
    private resourceProvider: ResourceProvider,
    private collaboratorProvider: CollaboratorProvider,
    private configProvider: ConfigProvider,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getKeys();

    // TODO - pensar para limitar a busca inicial em uma determinada quantidade
    this.activityId = sessionStorage.getItem('activity_id')!;
    this.getCollaboratorList();

    this.initForm();
    this.initFilter();
    this.getResourceList();

  }
  async getKeys() {
    let data = {
      key: ["registration_papers"]
    }
    const arrays = await this.configProvider.findKeys('project', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.papers = keyList['registration_papers'];

  }

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.shortListCollaborators();
  }

  private initFilter() {
    this.collaboratorControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filter(res);
        if (res && res.id) {
          this.collaboratorValid = true;
        } else {
          this.collaboratorValid = false;
        }
      });
  }

  displayFn(user: any): string {
    if (typeof user === 'string' && this.collaborators) {
      return this.collaborators.find(
        (collaborator) => collaborator.id === user
      );
    }
    return user && user.firstNameCorporateName && user.lastNameFantasyName
      ? user.firstNameCorporateName + ' ' + user.lastNameFantasyName
      : '';
  }

  private async _filter(name: string): Promise<void> {
    const params = { firstNameCorporateName: name, status: 1 };
    this.filteredCollaborators = await this.collaboratorProvider.findByName(
      params
    );
  }

  initForm(): void {
    this.resourceForm = this.fb.group({
      collaboratorId: [null],
      paper: ["", Validators.required],
      estimatedHours: [null, Validators.required],
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
    for (let j = 0; j < this.papers.length; j++) {
      if (this.papers[j].value === resourceSelected.paper) {
        resourceSelected.paper = this.papers[j].id
      }
    }
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

    for (let i = 0; i < this.dataTable.length; i++) {
      for (let j = 0; j < this.papers.length; j++) {
        if (this.dataTable[i].paper === this.papers[j].id) {
          this.dataTable[i].paper = this.papers[j].value
        }
      }
    }
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
        this.clearForm();
        this.getResourceList();
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
          this.clearForm();
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

  clearForm() {
    this.initForm();
    this.collaboratorControl.reset();
    this.method = '';
  }

  clear(): void {
    this.clearForm();
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }


}
