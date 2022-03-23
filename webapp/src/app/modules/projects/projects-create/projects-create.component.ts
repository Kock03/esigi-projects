import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectProvider } from 'src/providers/project.provider';

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss'],
})
export class ProjectsCreateComponent implements OnInit {
  projectForm!: FormGroup;
  project!: any;
  step: number = 1;
  range = new FormGroup({});
  controlHours: boolean = true;
  activities!: any;
  Resources!: any;
  projectType: any;
  projectId!: string | null; 

  get activityArray() {
    return this.projectForm.controls['activities'] as FormArray;
  }

  get resourcesArray() {
    return this.projectForm.controls['resources'] as FormArray;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectProvider: ProjectProvider
  ) {}

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      responsible: ['', Validators.required],
      client: ['', Validators.required],
      type: [null, Validators.required],
      contractedHours: ['', Validators.required],
      value: [0, Validators.required],
      controlHours: [null, Validators.required],
      managerEnvoltiProjectManager: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],

      activities: this.fb.array(this.project ? this.project.Activities : [], [
        Validators.required,
      ]),

      resources: this.fb.array(this.project ? this.project.Activities : [], [
        Validators.required,
      ]),


    });
  }

  async saveProject() {
    let data = this.projectForm.getRawValue();

    try {
      const project = await this.projectProvider.store(data);
      // this.router.navigate(['projetos']);
      sessionStorage.clear();
      console.log(data);
    } catch (error: any) {
      console.log('ERROR 132' + error);
    }
  }

  handleStep(number: number): void {
    this.step = number;
  }
  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 4 && direction === 'next') {
      this.step += 1;
    }
  }

  handleChanges(value: any): void {}

  goBackProjects() {
    this.router.navigate(['projetos']);
  }
}
