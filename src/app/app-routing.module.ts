import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',

    redirectTo: '/projetos/novo',

    pathMatch: 'full',
  },

  {
    path: 'projetos',
    loadChildren: () =>
      import('./modules/projects/projects.module').then(
        m => m.ProjectsModule
      ),
  },
];

@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
