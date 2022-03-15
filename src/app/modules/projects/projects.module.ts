import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsCreateComponent } from './projects-create/projects-create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path: 'novo',
    component: ProjectsCreateComponent,
  },
];

@NgModule({
  declarations: [
    ProjectsCreateComponent,
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
