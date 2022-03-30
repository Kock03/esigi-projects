import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PortalComponent } from './modules/projects/portal/portal/portal.component';
import { ProjectsCreateComponent } from './modules/projects/projects-create/projects-create.component';
import { ProjectsListComponent } from './modules/projects/projects-list/projects-list.component';

const routes: Routes = [
  {
    path: '',

    redirectTo: '/projetos/lista',

    pathMatch: 'full',
  },

  // { path: 'lista', component: ProjectsListComponent },


  // { path: 'projetos', component: PortalComponent },

  {
    path: 'projetos',
    loadChildren: () =>
      import('./modules/projects/projects.module').then(
        m => m.ProjectsModule
      ),
  },

  

  // { path: 'ams', component: ProjectsAmsCreateComponent },
];

@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
