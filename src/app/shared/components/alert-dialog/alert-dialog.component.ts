import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    TranslatePipe,
  ],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {
  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>, @Inject(MAT_DIALOG_DATA) public dialogOptions: AlertDialogOptions) { }
}

export interface AlertDialogOptions {
  title: string,
  message: string
}
