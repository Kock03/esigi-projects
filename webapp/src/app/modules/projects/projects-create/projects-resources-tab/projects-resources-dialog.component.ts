import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { fromEvent, debounceTime, distinctUntilChanged } from 'rxjs';
import { ICollaborator } from 'src/app/interfaces/icollaborator';
import { IResource } from 'src/app/interfaces/iresource';
import { ActivityProvider } from 'src/providers/activity.provider';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { ResourceProvider } from 'src/providers/resource.provider';
@Component({
  selector: 'app-projects-resources-dialog',
  templateUrl: 'projects-resources-dialog.html',
})
export class ProjectResourceDialog {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('resourceTable') resourceTable!: MatTable<any>;
  @ViewChild('accordion', { static: true }) Accordion!: MatAccordion;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  displayedColumns: string[] = ['firstNameCorporateName', 'paper', 'estimatedHours', 'icon'];
  resourceForm!: FormGroup;
  step = 0;

  collaborators!: any[];
  filteredCollaborators?: any[];



  index: any = null;
  resource!: IResource;
  accordion: any;
  dataTable: [] = [];
  activityId!: string;
  method: string = '';
  resourceId!: string | null;
  filteredCollaboratorList: any;
  // filter: any;
  collaborator!: ICollaborator;

  constructor(
    public dialogRef: MatDialogRef<ProjectResourceDialog>,
    private fb: FormBuilder,
    private activityProvider: ActivityProvider,
    private resourceProvider: ResourceProvider,
    private collaboratorProvider: CollaboratorProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    const col = this.getCollaboratorList();
    console.log(col);
    this.activityId = sessionStorage.getItem('activity_id')!;
    this.getResourceList()
    console.log(
      '🚀 ~ file: projects-resources-dialog.component.ts ~ line 46 ~ ProjectResourceDialog ~ ngOnInit ~ this.activityId ',
      this.activityId
    );
    this.initForm();
    this.initFilter();

  }

  async searchCollaborators(query?: string) {
    try {
      this.collaborators = await this.collaboratorProvider.findByName(query);
      console.log(this.collaborators);
    } catch (error) {
      console.error(error);
    }
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredCollaboratorList.data = this.collaborators.filter(
          (collaborator) =>
            collaborator.firstNameCorporateName
              .toLocaleLowerCase()
              .includes(this.filter.nativeElement.value.toLocaleLowerCase())

        )
        const params = `firstNameCorporateName=${this.filter.nativeElement.value}`;
        this.searchCollaborators(params);
      });

  }

  inputChange(text: any) {
    console.log(text.target.value)
    this._filter(text.target.value)
  };

  displayFn(user: any): string {
    return user && user.firstNameCorporateName ? user.firstNameCorporateName : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toUpperCase();

    if (name == null || '') return this.filteredCollaborators = this.collaborators

    return this.filteredCollaborators = this.collaborators.filter(collaborators => collaborators.firstNameCorporateName.toUpperCase().includes(filterValue));
  }


  async getResourceList() {
    const resourceList = await this.activityProvider.findOne(this.activityId);
    console.log(resourceList.resource)
    console.log(resourceList)
    this.dataTable = resourceList.resource;
  }

  initForm(): void {
    this.resourceForm = this.fb.group({
      collaboratorId: [null],
      paper: [null, Validators.required],
      estimatedHours: ['', Validators.required],
      isActive: [true],
      activity: { id: this.activityId },
    });
    if (this.dataTable) {
      this.resourceForm.patchValue(this.dataTable);
    }
  }

  getResource(resourceSelected: any, id: string) {
    this.method = 'edit';
    this.resourceId = id;
    this.resourceForm.patchValue(resourceSelected);
    this.Accordion.openAll();
  }

  onNoClick(): void {
    this.Accordion.closeAll();
  }

  async saveResource() {
    const data = this.resourceForm.getRawValue();
    console.log(data)
    if (this.method === 'edit') {
      try {
        const resource = await this.resourceProvider.update(
          this.resourceId,
          data
        );
        this.method = '';
        this.Accordion.closeAll();
        this.initForm();

        this.getResourceList();
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    } else {
      try {
        const resource = await this.resourceProvider.store(data);

        this.Accordion.closeAll();
        this.initForm();
        this.getResourceList();
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
  }

  async deleteResource(id: string) {
    let deleteResource = await this.resourceProvider.destroy(id);
    this.getResourceList();
  }

  setStep(index: number) {
    this.step = index;
  }

  async getCollaboratorList() {
    this.collaborators = await this.collaboratorProvider.findActive();
    console.log(this.collaborators);

  }


}
