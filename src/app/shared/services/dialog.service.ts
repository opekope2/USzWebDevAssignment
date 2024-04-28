import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent, AlertDialogOptions } from '../components/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  alert(title: string, message: string) {
    this.dialog.open(
      AlertDialogComponent,
      {
        data: { title, message } as AlertDialogOptions
      }
    );
  }
}
