import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent, AlertDialogOptions } from '../components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogOptions } from '../components/confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent, PromptDialogOptions } from '../components/prompt-dialog/prompt-dialog.component';
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

  confirm(title: string, message: string, yesButtonText: string, noButtonText: string): Observable<boolean> {
    return this.dialog.open(
      ConfirmDialogComponent,
      {
        data: { title, message, yesButtonText, noButtonText } as ConfirmDialogOptions
      }
    ).afterClosed()
  }

  prompt(title: string, message: string, yesButtonText: string, noButtonText: string): Observable<string | null> {
    return this.dialog.open(
      PromptDialogComponent,
      {
        data: { title, message, yesButtonText, noButtonText } as PromptDialogOptions
      }
    ).afterClosed()
  }
}
