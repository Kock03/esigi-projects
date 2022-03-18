import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-projects-allocation-resources-tab',
  templateUrl: './projects-allocation-resources-tab.component.html',
  styleUrls: ['./projects-allocation-resources-tab.component.scss']
})
export class ProjectsAllocationResourcesTabComponent implements OnInit {
  @Input('form') projectForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
