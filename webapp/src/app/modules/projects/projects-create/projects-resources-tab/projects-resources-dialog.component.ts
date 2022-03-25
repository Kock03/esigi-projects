import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatTable } from '@angular/material/table';
import { ActivityProvider } from 'src/providers/activity.provider';
import { ResourceProvider } from 'src/providers/resource.provider';
@Component({
  selector: 'app-projects-resources-dialog',
  templateUrl: 'projects-resources-dialog.html',
})
export class ProjectResourceDialog {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('resourceTable') resourceTable!: MatTable<any>;
  @ViewChild('accordion', { static: true })
  Accordion!: MatAccordion;

  displayedColumns: string[] = ['resource', 'paper', 'estimatedHours', 'icon'];
  resourceForm!: FormGroup;
  step = 0;

  index: any = null;
  resource: any;
  accordion: any;
  dataTable: [] = [];
  activityId!: string;
  method: string = '';
  resourceId!: string | null;

  constructor(
    public dialogRef: MatDialogRef<ProjectResourceDialog>,
    private fb: FormBuilder,
    private activityProvider: ActivityProvider,
    private resourceProvider: ResourceProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.activityId = sessionStorage.getItem('activity_id')!;
    console.log(
      '🚀 ~ file: projects-resources-dialog.component.ts ~ line 46 ~ ProjectResourceDialog ~ ngOnInit ~ this.activityId ',
      this.activityId
    );
    this.initForm();
  }

  async getResourceList() {
    const resourceList = await this.activityProvider.findOne(this.activityId);
    this.dataTable = resourceList.resource;
  }

  initForm(): void {
    this.resourceForm = this.fb.group({
      resource: [null],
      paper: ['', Validators.required],
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
}
