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


  range = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.projectType = sessionStorage.getItem('project_type')
  }

  next() {
    this.onChange.next(true);
  }

}
