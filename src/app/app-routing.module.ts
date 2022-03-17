import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PortalComponent } from './modules/projects/portal/portal/portal.component';
import { ProjectsCreateComponent } from './modules/projects/projects-create/projects-create.component';
import { ProjectsAmsCreateComponent } from './modules/projects/projects-ams-create/projects-ams-create.component';

const routes: Routes = [
  {
    path: '',

    redirectTo: '/portal',

    pathMatch: 'full',
  },

  {
    path: 'projetos',
    loadChildren: () =>
      import('./modules/projects/projects.module').then(
        m => m.ProjectsModule
      ),
  },

  { path: 'portal', component: PortalComponent },

  { path: 'alocacao', component: ProjectsCreateComponent },

  { path: 'ams', component: ProjectsAmsCreateComponent },
];

@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
