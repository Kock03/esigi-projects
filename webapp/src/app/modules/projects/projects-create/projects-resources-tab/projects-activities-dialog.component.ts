import { formatDate } from '@angular/common';
import {
  Injectable,
  Component,
  Output,
  EventEmitter,
  Inject,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { ActivityProvider } from 'src/providers/activity.provider';
import { CompareDates, isDateGreaterThanToday, isValidData } from 'src/app/validators/date-compare.validator';
import { ProjectProvider } from 'src/providers/project.provider';

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
  styleUrls: ['./projects-activities-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class ProjectActivityDialog {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Input() dateCompare!: string;

  range = new FormGroup({});
  activityForm!: FormGroup;

  Date: any;
  projectId!: string;
  method!: string;
  activityId!: string | null;
  collaboratorControl = new FormControl();
  compareDate!: any;

  constructor(
    public dialogRef: MatDialogRef<ProjectActivityDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activityProvider: ActivityProvider,
    private projectProvider: ProjectProvider,
  ) { }

 async ngOnInit() {
    this.method = sessionStorage.getItem('method')!;
    this.projectId = sessionStorage.getItem('project_id')!;
    this.initForm();
    await this.getDate();
    console.log("CompareDate " + this.compareDate)
  }

  initForm(): void {
    this.activityForm = this.fb.group({
      name: [null,Validators.required],
      compareDate: [null],
      startDate: this.fb.control({ value: new Date().toLocaleDateString(), disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      endDate: this.fb.control({ value: '', disabled: false }, [DocumentValidator.isValidData(), Validators.required, DocumentValidator.isDateGreaterThanToday()]),
      project: { id: this.projectId },
    },
      {
        validator: [CompareDates('compareDate', 'endDate'), isDateGreaterThanToday('endDate'), isValidData('endDate')]
      });
    if (this.data) {
      this.activityForm.patchValue(this.data);
    }
  }
  async getDate() {
    const project = await this.projectProvider.findOne(this.projectId);
    this.compareDate = project.endDate.split('/').reverse().join('/');
    this.activityForm.controls['compareDate'].setValue(this.compareDate);
  }
  
  async save() {
    const data = this.activityForm.getRawValue();
    if (this.method === 'add') {
      try {
        const activity = await this.activityProvider.store(data);
        sessionStorage.setItem('activity_id', activity.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.activityId = sessionStorage.getItem('activity_id');
        const updateActivity = await this.activityProvider.update(
          this.activityId,
          data
        );
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }

}
