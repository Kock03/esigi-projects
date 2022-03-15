import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsCreateComponent } from './projects-create/projects-create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { ProjectsRegisterComponent } from './projects-create/projects-register/projects-register.component';
import { ProjectsResourcesTabComponent } from './projects-create/projects-resources-tab/projects-resources-tab.component';
import { ProjectsRegisterTabComponent } from './projects-create/projects-register-tab/projects-register-tab.component';
import { ProjectsPanelTabComponent } from './projects-create/projects-panel-tab/projects-panel-tab.component';

const routes: Routes = [
  {
    path: 'novo',
    component: ProjectsCreateComponent,
  },
];

@NgModule({
  declarations: [
    ProjectsCreateComponent,
    ProjectsRegisterComponent,
    ProjectsResourcesTabComponent,
    ProjectsRegisterTabComponent,
    ProjectsPanelTabComponent,
  ],
  imports: [
    RouterModule.forChild(routes), 
    CommonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatButtonModule,
  ],
  entryComponents: [
    ProjectsCreateComponent,
    
  ],
})
export class ProjectsModule {}
