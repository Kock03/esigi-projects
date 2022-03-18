import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-projects-allocation-register-tab',
  templateUrl: './projects-allocation-register-tab.component.html',
  styleUrls: ['./projects-allocation-register-tab.component.scss']
})
export class ProjectsAllocationRegisterTabComponent implements OnInit {
  @Input('form') projectForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  range = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
  }

  next() {
    this.onChange.next(true);
  }

}
