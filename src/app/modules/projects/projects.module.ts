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
import { ProjectsPanelTabComponent } from './projects-create/projects-register-tab/projects-panel-tab/projects-panel-tab.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PortalComponent } from './portal/portal/portal.component';

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
    PortalComponent,
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
  ],
  entryComponents: [
    ProjectsCreateComponent,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProjectsModule {}
