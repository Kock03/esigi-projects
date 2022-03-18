import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsAllocationCreateComponent } from './projects-allocation-create/projects-allocation-create.component';
import { ProjectsAllocationRegisterTabComponent } from './projects-allocation-create/projects-allocation-register-tab/projects-allocation-register-tab.component';
import { ProjectsAllocationPanelTabComponent } from './projects-allocation-create/projects-allocation-panel-tab/projects-allocation-panel-tab.component';
import { ProjectsAllocationResourcesTabComponent } from './projects-allocation-create/projects-allocation-resources-tab/projects-allocation-resources-tab.component';


import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'  
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PortalComponent } from './portal/portal/portal.component';
import { ProjectsResourcesDialog } from './projects-allocation-create/projects-allocation-resources-tab/projects-allocation-resources-dialog.component';
import { NgxMaskModule } from 'ngx-mask';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjectsCreateComponent } from './projects-create/projects-create.component';
import { ProjectsRegisterTabComponent } from './projects-create/projects-register-tab/projects-register-tab.component';
import { ProjectsResourcesTabComponent } from './projects-create/projects-resources-tab/projects-resources-tab.component';
import { ProjectsPanelTabComponent } from './projects-create/projects-panel-tab/projects-panel-tab.component';


const routes: Routes = [
  // {
  //   path: 'alocacao',
  //   component: ProjectsCreateComponent,
  // },
];

@NgModule({
  declarations: [
    ProjectsResourcesDialog,
    ProjectsAllocationCreateComponent,
    ProjectsAllocationRegisterTabComponent,
    ProjectsAllocationPanelTabComponent,
    ProjectsAllocationResourcesTabComponent,
    ProjectsCreateComponent,
    ProjectsRegisterTabComponent,
    ProjectsResourcesTabComponent,
    ProjectsPanelTabComponent,

  ],
  imports: [
    RouterModule.forChild(routes), 
    CommonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  entryComponents: [
    ProjectsAllocationCreateComponent,
    ProjectsResourcesDialog,
    ProjectsAllocationRegisterTabComponent,
    ProjectsAllocationPanelTabComponent,
    ProjectsAllocationResourcesTabComponent,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProjectsModule {}
