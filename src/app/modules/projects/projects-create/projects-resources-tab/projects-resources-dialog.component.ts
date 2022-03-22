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
  resourcesArray!: FormArray;
  dataTable: [] = [];


  constructor(
    public dialogRef: MatDialogRef<ProjectResourceDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
   this.resourcesArray = this.data.array;
   console.log("🚀 ~ file: projects-resources-dialog.component.ts ~ line 45 ~ ProjectResourceDialog ~ ngOnInit ~ this.resourcesArray", this.resourcesArray)
    this.initForm();
    if (this.resourcesArray.value.length > 0) {
      this.dataTable = this.resourcesArray.value;
    }

    this.initObservables();
  }

  ngAfterViewInit(): void {}

  initObservables() {
    this.resourcesArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.resourcesArray.value.findIndex(
        (resource: any) => resource == null
      );
      if (isNullIndex !== -1) {
        this.resourcesArray.removeAt(isNullIndex);
      }
      if (res) {
        this.dataTable = this.resourcesArray.value;
      }
    });
  }

  initForm(): void {
    this.resourceForm = this.fb.group({
      resource: [null],
      paper: ['', Validators.required],
      estimatedHours: ['', Validators.required],
    });
    if (this.dataTable) {
      this.resourceForm.patchValue(this.dataTable);
    }
  }

  getResource(resourceSelected: any, index: number) {
    this.resourceForm.patchValue(resourceSelected)
    this.Accordion.openAll();
    
  }

  onNoClick(): void {
    this.Accordion.closeAll();
   
  }

  async saveResource() {
    const data = this.resourceForm.getRawValue();
    if (data) {
      this.resourcesArray.insert(0, this.fb.group(data));
      this.resourceTable.renderRows();
      this.Accordion.closeAll();
      this.initForm();
      console.log(data);
    }
  }

  deleteResource(index: number) {
    this.resourcesArray.removeAt(index);
  }

  setStep(index: number) {
    this.step = index;
  }
}
