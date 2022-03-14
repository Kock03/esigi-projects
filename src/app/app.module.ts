import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { ProjectsCreateComponent } from './modules/projects/projects-create/projects-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectsCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
