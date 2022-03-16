import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsCreateComponent } from './projects-create/projects-create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'  
import { ProjectsResourcesTabComponent } from './projects-create/projects-resources-tab/projects-resources-tab.component';
import { ProjectsRegisterTabComponent } from './projects-create/projects-register-tab/projects-register-tab.component';
import { ProjectsPanelTabComponent } from './projects-create/projects-panel-tab/projects-panel-tab.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProjectsResourcesDialog } from './projects-create/projects-resources-tab/projects-resources-dialog.component';

const routes: Routes = [
  {
    path: 'novo',
    component: ProjectsCreateComponent,
  },
];

@NgModule({
  declarations: [
    ProjectsCreateComponent,
    ProjectsResourcesTabComponent,
    ProjectsRegisterTabComponent,
    ProjectsPanelTabComponent,
    ProjectsResourcesDialog,
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
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule
  ],
  entryComponents: [
    ProjectsCreateComponent,
    ProjectsResourcesDialog,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProjectsModule {}
