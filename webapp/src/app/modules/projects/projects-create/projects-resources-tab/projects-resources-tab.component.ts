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
import { ActivityProvider } from 'src/providers/activity.provider';
import { ProjectProvider } from 'src/providers/project.provider';
import { ProjectActivityDialog } from './projects-activities-dialog.component';
import { ProjectResourceDialog } from './projects-resources-dialog.component';
import { ResourceProvider} from 'src/providers/resource.provider';

@Component({
  selector: 'app-projects-resources-tab',
  templateUrl: './projects-resources-tab.component.html',
  styleUrls: ['./projects-resources-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsResourcesTabComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('activityTable') activityTable!: MatTable<any>;

  displayedColumns: string[] = [
    'name',
    'startDate',
    'endDate',
    'resources',
    'icon',
  ];

  data: [] = [];
  activityForm!: FormGroup;

  index: any = null;
  activity: any;
  projectId!: string | null;
  activityId!: string | null;
  method: string = '';
  tab!: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private projectProvider: ProjectProvider,
    private activityProvider: ActivityProvider,
    private resourceProvider: ResourceProvider,
  ) {}

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!  
    if(this.method === 'edit'){
      this.getActivityList();
    }
   
    // if (this.activityArray.value.length > 0) {
    //   this.data = this.activityArray.value;
    // }
    // this.initObservables();
  }

  async getActivityList() {
    this.projectId = sessionStorage.getItem('project_id');
    const activity = await this.projectProvider.findOne(this.projectId);
    console.log("🚀 ~ file: projects-resources-tab.component.ts ~ line 68 ~ ProjectsResourcesTabComponent ~ getActivityList ~ activity", activity)
    this.data = activity.activities;
    console.log(this.data);
  }

  async getResourceList(){
    this.projectId = sessionStorage.getItem('project_id');
    const ressource = await this.resourceProvider.findOne(this.projectId);
    this.data = ressource.ressources;
    console.log(this.data);
  }

  // initObservables() {
  //   this.activityArray.valueChanges.subscribe((res) => {
  //     const isNullIndex = this.activityArray.value.findIndex(
  //       (activity: any) => activity == null
  //     );
  //     if (isNullIndex !== -1) {
  //       this.activityArray.removeAt(isNullIndex);
  //     }
  //     if (res) {
  //       this.data = this.activityArray.value;
  //     }
  //   });
  // }

  next() {
    this.onChange.next(true);
  }

  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(ProjectActivityDialog, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((activity) => {
      if (activity) {
        this.getActivityList();
      }
    });
  }

  openDialogResources(id: string) {
    this.activityId = id;
    sessionStorage.setItem('activity_id', this.activityId);
    const dialogRef = this.dialog.open(ProjectResourceDialog, {
      width: '500px',
      height: '450px',
    });
  }

  async getActivity(activitySelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.activityId = id;
    sessionStorage.setItem('activity_id', this.activityId);
    const dialogRef = this.dialog.open(ProjectActivityDialog, {
      width: '500px',
      height: '300px',
      data: activitySelected,
    });

    dialogRef.afterClosed().subscribe((activity) => {
      if (activity) {
        this.getActivityList();
      }
    });
  }

  async deleteActivity(id: string) {
    let deleteActivity = await this.activityProvider.destroy(id);
    this.getActivityList();
  }
}
