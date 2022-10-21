import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { CustomerProvider } from 'src/providers/customer.provider';
import { debounceTime, distinctUntilChanged } from 'rxjs';



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
  @Input('collaborator') collaboratorControl!: FormControl;
  @Input('customer') customerControl!: FormControl;
  @Input('responsible') responsibleControl!: FormControl;
  @Input('replace') collaboratorReplaceControl!: FormControl;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild('fiiilter', { static: true }) fiiilter!: ElementRef;
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  projectType: any;
  projectId: any;
  codeInputDisabled = new FormControl({ disabled: true });
  collaborators!: any[];
  filteredCollaborators!: any[];
  filteredCollaboratorList: any;
  collaborator!: any;
  collaboratorValid: boolean = false;
  method!: any;
  customers!: any[];
  filteredCustomers!: any[];
  filteredCustomerList: any;
  customer!: any;
  customerValid: boolean = false;

  responsibles!: any[];
  filteredResponsibles!: any[];
  filteredResponsibleList: any;
  responsible!: any;
  responsibleValid: boolean = false;

  constructor(private route: ActivatedRoute,
    public translateService: TranslateService,
    private collaboratorProvider: CollaboratorProvider,
    private customerProvider: CustomerProvider) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectType = sessionStorage.getItem('project_type');
    this.method = sessionStorage.getItem('method');
    this.codeInputDisabled.disable();
    this.getCollaboratorList();
    this.getCustomerList();
    // this.getResponsibleList();
    this.initFilterCustomer();
    this.initFilterRequester();
    // this.initFilterResponsible();
  }


  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.findGerente();
  }
  async getCustomerList() {
    this.filteredCustomerList = this.customers =
      await this.customerProvider.shortListCustomers();
      await this.getResponsibleList();
  }

  async getResponsibleList() {
    this.filteredResponsibleList = this.responsibles =
      await this.customerProvider.findByNameContact(this.responsible.id);
  }

  private initFilterRequester() {
    this.collaboratorControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterRequester(res);
        if (res && res.id) {
          this.collaboratorValid = true;
        } else {
          this.collaboratorValid = false;
        }

      });

  }

  private initFilterCustomer() {
    this.customerControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterCustomer(res);
        if (res && res.id) {
          this.customerValid = true;
        } else {
          this.customerValid = false;
        }

      });

  }

  // private initFilterResponsible() {
  //   this.collaboratorControl.valueChanges
  //     .pipe(debounceTime(350), distinctUntilChanged())
  //     .subscribe((res) => {
  //       this._filterResponsible(res);
  //       if (res && res.id) {
  //         this.collaboratorValid = true;
  //       } else {
  //         this.collaboratorValid = false;
  //       }

  //     });

  // }

  displayFnRequester(user: any): string {
    if (typeof user === 'string' && this.collaborators) {
      return this.collaborators.find(
        (collaborator) => collaborator.id === user
      );
    }
    return user && user.firstNameCorporateName && user.lastNameFantasyName
      ? user.firstNameCorporateName + ' ' + user.lastNameFantasyName
      : '';
  }



  displayFnCustomer(user: any): string {
    if (typeof user === 'string' && this.customers) {
      return this.customers.find(
        (customer) => customer.id === user
      );
    }
    return user && user.corporateName
    ,  ? user.corporateName
      : '';
  }

  displayFnResponsible(user: any): string {
    if (typeof user === 'string' && this.responsibles) {
      return this.responsibles.find(
        (customer) => customer.id === user
      );
    }
    return user && user.name
      ? user.name
      : '';
  }

  private async _filterRequester(name: string): Promise<void> {
    const params = `firstNameCorporateName=${name}`;
    this.filteredCollaborators = await this.collaboratorProvider.findByNameGerente(
      params
    );

  }


  // private async _filterResponsible(name: string): Promise<void> {
  //   const data = {
  //     corporateName: name,
  //     status: 1,
  //   };
  //   this.filteredCustomers = await this.customerProvider.findByNameContact(
  //     data
  //   );

  // }

  private async _filterCustomer(name: string): Promise<void> {
    const data = {
      corporateName: name,
      // status: 1,
    };
    this.filteredCustomers = await this.customerProvider.findByName(
      data
    );

  }

  next() {
    this.onChange.next(true);
  }
}
