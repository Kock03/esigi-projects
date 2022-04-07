import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  projectId: any;
  codeInputDisabled = new FormControl({ disabled: true });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');

    this.projectType = sessionStorage.getItem('project_type');
    console.log(
      '🚀 ~ file: projects-register-tab.component.ts ~ line 20 ~ ProjectsRegisterTabComponent ~ ngOnInit ~  this.projectType',
      this.projectType
    );

    this.codeInputDisabled.disable();
  }

  next() {
    this.onChange.next(true);
  }
}
