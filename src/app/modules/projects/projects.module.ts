import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsAllocationCreateComponent } from './projects-allocation-create/projects-allocation-create.component';
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
import { ProjectsAmsPanelTabComponent } from './projects-ams-create/projects-ams-panel-tab/projects-ams-panel-tab.component';
import { ProjectsAmsCreateComponent } from './projects-ams-create/projects-ams-create.component';
import { ProjectsAllocationRegisterTabComponent } from './projects-allocation-create/projects-allocation-register-tab/projects-allocation-register-tab.component';
import { ProjectsAllocationPanelTabComponent } from './projects-allocation-create/projects-allocation-panel-tab/projects-allocation-panel-tab.component';
import { ProjectsAllocationResourcesTabComponent } from './projects-allocation-create/projects-allocation-resources-tab/projects-allocation-resources-tab.component';


const routes: Routes = [
  // {
  //   path: 'alocacao',
  //   component: ProjectsCreateComponent,
  // },
];

@NgModule({
  declarations: [
    ProjectsResourcesDialog,
    ProjectsAmsPanelTabComponent,
    ProjectsAmsCreateComponent,
    ProjectsAllocationCreateComponent,
    ProjectsAllocationRegisterTabComponent,
    ProjectsAllocationPanelTabComponent,
    ProjectsAllocationResourcesTabComponent,

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
    ProjectsAmsPanelTabComponent,
    ProjectsAmsCreateComponent,
    ProjectsAllocationCreateComponent,
    ProjectsAllocationRegisterTabComponent,
    ProjectsAllocationPanelTabComponent,
    ProjectsAllocationResourcesTabComponent,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProjectsModule {}
