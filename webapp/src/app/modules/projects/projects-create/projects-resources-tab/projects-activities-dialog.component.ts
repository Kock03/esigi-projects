import { formatDate } from '@angular/common';
import {
  Injectable,
  Component,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  selector: 'projects-activities-dialog',
  templateUrl: 'projects-activities-dialog.html',
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class ProjectActivityDialog {
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  range = new FormGroup({});
  activityForm!: FormGroup;

  Date: any;

  constructor(
    public dialogRef: MatDialogRef<ProjectActivityDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.activityForm = this.fb.group({
      name: [null],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    if (this.data) {
      this.activityForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async save() {
    const data = this.activityForm.getRawValue();
    this.dialogRef.close(data);
  }
}
