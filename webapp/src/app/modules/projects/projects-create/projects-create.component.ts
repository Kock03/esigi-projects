import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectProvider } from 'src/providers/project.provider';
import { SnackBarService} from 'src/services/snackbar.service';

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
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

  validations = [
    ['name', 'client', 'managerEnvoltiProjectManager', 'status'],
  ];

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
    private projectProvider: ProjectProvider,
    private snackbarService: SnackBarService,
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
       
      this.snackbarService.successMessage('Projeto cadastrado com sucesso');
      sessionStorage.setItem('project_id', project.id)
      console.log(data);
    } catch (error: any) {
      this.snackbarService.showError(
        error.error?.message ?? 'Ocorreu um erro, tente novamente'
      );
      console.log('ERROR 132' + error);
    }
  }

  handleStep(number: number): void {
    if (!this.checkValid() && this.step < number) {
      this.snackbarService.showAlert('Verifique os campos');
    } else if (this.step - number < 1) {
      this.step = number;
      sessionStorage.setItem('project_tab', this.step.toString());
    } else {
      this.step = number;
      sessionStorage.setItem('project_tab', this.step.toString());
    }
  }
  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 4 && direction === 'next') {
      this.step += 1;
    }
  }
  checkValid(): boolean {
    let isValid = true;
    const validations = this.validations[this.step - 1];
    for (let index = 0; index < validations.length; index++) {
      if (this.projectForm.controls[validations[index]].invalid) {
        isValid = false;
  
        this.projectForm.markAllAsTouched();
      }
    }
    return isValid;
  }

  handleChanges(value: any): void {}

  goBackProjects() {
    sessionStorage.clear();
    this.router.navigate(['projetos']);
  }
}
