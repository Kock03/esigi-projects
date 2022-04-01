import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectProvider } from 'src/providers/project.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { MatTable } from '@angular/material/table';
import { filter, pairwise } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsCreateComponent implements OnInit {
  projectForm!: FormGroup;
  project!: any;
  step: any = 1;
  range = new FormGroup({});
  controlHours: boolean = true;
  activities!: any;
  Resources!: any;
  projectType: any;
  projectId!: string | null;
  // method: string = '';
  // accordion!: MatAccordion;

  validations = [['name', 'client', 'managerEnvoltiProjectManager', 'status']];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectProvider: ProjectProvider,
    private snackbarService: SnackBarService
  ) {}

  async ngOnInit(): Promise<void> {
    if (sessionStorage.getItem('project_tab') !== undefined) {
      sessionStorage.setItem('project_tab', '1');
    }

    this.projectId = this.route.snapshot.paramMap.get('id');
    console.log(this.projectId);
    this.step = JSON.parse(sessionStorage.getItem('project_tab')!);

    // await this.getProject();
    console.log(this.project);
    
    this.initForm();
    await this.setFormValue();
  }

  async setFormValue() {
    if (this.project) {
      this.projectForm.patchValue(this.project);
    }
  }

  async getProject() {
    try {
      this.project = await this.projectProvider.findOne(this.projectId);
    } catch (error) {
      console.log(error);
    }
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
    });
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

  async saveProject() {
    let data = this.projectForm.getRawValue();

    try {
      const project = await this.projectProvider.store(data);

      this.snackbarService.successMessage('Projeto cadastrado com sucesso');
      sessionStorage.setItem('project_id', project.id);
      this.navigate('next');
      console.log(data);
    } catch (error: any) {
      this.snackbarService.showError(
        error.error?.message ?? 'Ocorreu um erro, tente novamente'
      );
      console.log('ERROR 132' + error);
      sessionStorage.setItem('project_tab', this.step.toString());
    }
  }

  async editProject() {
    const data = this.projectForm.getRawValue(); console.log(data);
    try {
      const porject = await this.projectProvider.update(this.projectId, data);
      this.router.navigate(['projetos/lista']);
      this.snackbarService.successMessage('Projeto atualizado com sucesso');
    } catch (err: any) {
      this.snackbarService.showError(
        err.error?.message ?? 'Ocorreu um erro, tente novamente'
      );
    }
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.checkValid() && this.step < 4 && direction === 'next') {
      this.step += 1;
    } else {
      this.snackbarService.showAlert('Verifique os campos');
    }
  }

  checkValid(): boolean {
    let isValid = true;
    const validations = this.validations[this.step - 1];
    if (validations !== undefined) {
      for (let index = 0; index < validations.length; index++) {
        if (this.projectForm.controls[validations[index]].invalid) {
          isValid = false;

          this.projectForm.markAllAsTouched();
        }
      }
    }
    return isValid;
  }

  handleChanges(value: any): void {}

  goBackProjects() {
    sessionStorage.clear();
    this.router.navigate(['projetos/lista']);
  }
}
