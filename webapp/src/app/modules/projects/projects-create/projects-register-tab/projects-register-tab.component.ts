import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';


export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
  },
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-projects-register-tab',
  templateUrl: './projects-register-tab.component.html',
  styleUrls: ['./projects-register-tab.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
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
