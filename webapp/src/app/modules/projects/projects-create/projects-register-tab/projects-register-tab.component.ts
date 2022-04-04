import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-projects-register-tab',
  templateUrl: './projects-register-tab.component.html',
  styleUrls: ['./projects-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsRegisterTabComponent implements OnInit {
  @Input('form') projectForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  projectType: any;

  constructor() { }

  ngOnInit(): void {
    this.projectType = sessionStorage.getItem('project_type')
    console.log("🚀 ~ file: projects-register-tab.component.ts ~ line 20 ~ ProjectsRegisterTabComponent ~ ngOnInit ~  this.projectType",  this.projectType)
  }

  next() {
    this.onChange.next(true);
  }

}
