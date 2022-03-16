import { formatDate } from "@angular/common";
import { Component, EventEmitter, Inject, Injectable, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from "@angular/material/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
  },
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}
@Component({
    selector: 'projects-resources-dialog',
    templateUrl: 'projects-resources-dialog.html',
    styleUrls: ['./projects-resources-tab.component.scss'],
    providers: [
      { provide: DateAdapter, useClass: PickDateAdapter },
      { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
    ],
  })
  export class ProjectsResourcesDialog implements OnInit {
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    resourceForm!: FormGroup;
    Date: any;

    constructor(
      public dialogRef: MatDialogRef<ProjectsResourcesDialog>,
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  
    ngOnInit(): void {
      this.initForm();
    }

  initForm(): void {
    this.resourceForm = this.fb.group({
      name: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
    if (this.data) {
      this.resourceForm.patchValue(this.data);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  async save() {
    const data = this.resourceForm.getRawValue();
    this.dialogRef.close(data);
  }
  
  
}
  