import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PortalComponent } from './modules/projects/portal/portal.component';
import { ValidateTokenComponent } from './components/validate-token/validate-token.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/projetos/lista',
    pathMatch: 'full',
  },
  {
    path: 'validate/:id',
    component: ValidateTokenComponent,
  },
  {
    path: 'projetos',
    loadChildren: () =>
      import('./modules/projects/projects.module').then(
        (m) => m.ProjectsModule
      ),
  },

  {
    path: 'projeto/tipo',
    component: PortalComponent,
  },


];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
