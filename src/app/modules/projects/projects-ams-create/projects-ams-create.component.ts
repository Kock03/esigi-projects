import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects-ams-create',
  templateUrl: './projects-ams-create.component.html',
  styleUrls: ['./projects-ams-create.component.scss']
})
export class ProjectsAmsCreateComponent implements OnInit {

  projectAmsForm!: FormGroup;
  step: number = 1;
  range = new FormGroup({});
  controlHours: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();  
  }

  initForm(): void {
    this.projectAmsForm = this.fb.group({
    })
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

  handleChanges(value: any): void { }

  goBackProjects() {
    this.router.navigate(['projetos/novo']);
  }
}
