import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ConfigDialogModule],
  imports: [MatDialogModule, MatButtonModule, CommonModule, FlexLayoutModule],
  entryComponents: [ConfigDialogModule],
  exports: [ConfigDialogModule],
  providers: [ConfigDialogModule],
})
export class ConfigDialogModule { }
