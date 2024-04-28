import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent, AlertDialogOptions } from '../components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogOptions } from '../components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  alert(title: string, message: string, okButtonText: string) {
    this.dialog.open(
      AlertDialogComponent,
      {
        data: { title, message, okButtonText } as AlertDialogOptions
      }
    );
  }

  confirm(title: string, message: string): Observable<boolean> {
    return this.dialog.open(
      ConfirmDialogComponent,
      {
        data: { title, message } as ConfirmDialogOptions
      }
    ).afterClosed()
  }
}
