import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ProjectActivityDialog } from './projects-activities-dialog.component';
import { ProjectResourceDialog } from './projects-resources-dialog.component';

@Component({
  selector: 'app-projects-resources-tab',
  templateUrl: './projects-resources-tab.component.html',
  styleUrls: ['./projects-resources-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsResourcesTabComponent implements OnInit {
  @Input() activityArray!: FormArray;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('activityTable') activityTable!: MatTable<any>;

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'icon'];

  data: [] = [];
  activityForm!: FormGroup;

  index: any = null;
  activity: any;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.activityArray.value.length > 0) {
      this.data = this.activityArray.value;
    }

    this.initObservables();
  }

  initObservables() {
    this.activityArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.activityArray.value.findIndex(
        (activity: any) => activity == null
      );
      if (isNullIndex !== -1) {
        this.activityArray.removeAt(isNullIndex);
      }
      if (res) {
        this.data = this.activityArray.value;
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectActivityDialog, {
      width: '500px',
      height: '450',
    });

    dialogRef.afterClosed().subscribe((activity) => {
      if (activity) {
        this.activityArray.insert(0, this.fb.group(activity));
        this.activityTable.renderRows();
      }
    });
  }

  openDialogResources() {
    const dialogRef = this.dialog.open(ProjectResourceDialog, {
      width: '500px',
      height: '450',
    });
  }

  getActivity(activitySelected: any, index: number) {
    const dialogRef = this.dialog.open(ProjectActivityDialog, {
      width: '500px',
      height: '550px',
      data: activitySelected,
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((activity) => {
      if (activity) {
        this.activityArray.controls[this.index].patchValue(activity);
      }
    });
  }

  deleteActivity(index: number) {
    this.activityArray.removeAt(index);
  }
}
