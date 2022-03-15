import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss']
})
export class ProjectsCreateComponent implements OnInit {
  step: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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

}
