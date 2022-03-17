import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ProjectsResourcesDialog } from './projects-allocation-resources-dialog.component';

export interface Resources{
  name: string;
  startDate: string;
  endDate: string;
}
@Component({
  selector: 'app-projects-resources-tab',
  templateUrl: './projects-allocation-resources-tab.component.html',
  styleUrls: ['./projects-allocation-resources-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

 
export class ProjectsResourcesTabComponent implements OnInit {
  @Input() resourcesArray!: FormArray;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('resourceTable') resourceTable!: MatTable<any>;

  displayedColumns: string[] = [
    "name",
    "startDate",
    "endDate",
    'icon',
  ];

  resources: Resources[] = [
    {
      name: 'MariSol',
      startDate: '45hrs',
      endDate: 'Em andamento',
    },
  ];

  data:[] =[];
  resourceForm!: FormGroup;

  index: any = null;
  Resource: any;

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.resourcesArray.value.length > 0) {
      this.data = this.resourcesArray.value;
    }
  }

  next(){
    this.onChange.next(true);
  }

  openDialog(){
    const dialogRef = this.dialog.open(ProjectsResourcesDialog,{
      width:'500px',
      height:'400x'
    });

    dialogRef.afterClosed().subscribe(resource =>{
      if(resource){
        this.resourcesArray.insert(0, this.fb.group(resource));
        this.resourceTable.renderRows();
      }
    })
  }

  getResource(resourceSelected: any, index: number){
    const dialogRef = this.dialog.open(ProjectsResourcesDialog,{
      width:'500px',
      height:'650px',
      data: resourceSelected
    });
    this.index = index;
    dialogRef.afterClosed().subscribe(resource =>{
      if(resource){
        this.resourcesArray.controls[this.index].patchValue(resource);
      }
    });
  }

  deleteResource(index: number){
    this.resourcesArray.removeAt(index);
  }

}
