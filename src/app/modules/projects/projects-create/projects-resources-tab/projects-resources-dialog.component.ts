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
  selector: 'projects-resources-dialog',
  templateUrl: 'projects-resources-dialog.html',
})
export class ProjectResourceDialog {
  @Input() resourceArray!: FormArray;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('resourceTable') resourceTable!: MatTable<any>;
  @ViewChild('accordion', { static: true })
  Accordion!: MatAccordion;

  displayedColumns: string[] = ['resource', 'paper', 'estimatedHours', 'icon'];

  dataResource: [] = [];
  resourceForm!: FormGroup;
  step = 0;

  index: any = null;
  resource: any;
  accordion: any;

  constructor(
    public dialogRef: MatDialogRef<ProjectResourceDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.resourceArray.value.length > 0) {
      this.dataResource = this.resourceArray.value;
    }

    this.initObservables();
  }

  ngAfterViewInit(): void {}

  initObservables() {
    this.resourceArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.resourceArray.value.findIndex(
        (resource: any) => resource == null
      );
      if (isNullIndex !== -1) {
        this.resourceArray.removeAt(isNullIndex);
      }
      if (res) {
        this.dataResource = this.resourceArray.value;
      }
    });
  }

  initForm(): void {
    this.resourceForm = this.fb.group({
      resource: [null],
      paper: ['', Validators.required],
      estimatedHours: ['', Validators.required],
    });
    if (this.data) {
      this.resourceForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.Accordion.closeAll();
  }

  async saveResource() {
    const data = this.resourceForm.getRawValue;
    if (data) {
      this.resourceArray.insert(0, this.fb.group(data));
      this.resourceTable.renderRows();
      console.log(data);
    }
  }

  setStep(index: number) {
    this.step = index;
  }
}
