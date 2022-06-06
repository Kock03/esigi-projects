import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfigDialogComponent implements OnInit {

  public titleMessage: string = '';
  public domain: string = '';
  public subtitleMessage: string = '';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit(): void {
    this.titleMessage = this.data.title;
    this.subtitleMessage = this.data.subtitle;
    this.domain = this.data.domain;
  }

}
