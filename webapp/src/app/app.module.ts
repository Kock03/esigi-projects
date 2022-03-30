import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/services/snackbar.service';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';
import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    AppComponent,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    LayoutModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    NgxMaskModule,
    HttpClientModule,
    MatSnackBarModule,
    ConfirmDialogModule,
    MatSelectModule,
  ],
  providers: [SnackBarService, ConfirmDialogService],
  bootstrap: [AppComponent],
  exports: [MatTableModule],
})
export class AppModule {}
