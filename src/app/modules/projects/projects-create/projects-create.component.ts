import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  Activities!: any;

  get activityArray() {
    return this.projectForm.controls['Activities'] as FormArray;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
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
      projectTypes: [null, Validators.required],
      contractedHours: ['', Validators.required],
      value: ['', Validators.required],
      controlHours: [null, Validators.required],
      managerEnvolti: ['', Validators.required],
      status: ['', Validators.required],

      startDate: ['', Validators.required],
      endDate: ['', Validators.required],

      Activities: this.fb.array(this.project ? this.project.Activities : [], [
        Validators.required,
      ]),

      range: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      }),
    });
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
    this.router.navigate(['portal']);
  }
}
