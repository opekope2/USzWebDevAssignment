import { AuthService } from '../shared/services/auth.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from "@angular/material/tabs"
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { TranslateService } from '../shared/services/translate.service';
import { DialogService } from '../shared/services/dialog.service';
import { LoadingIndicatorComponent } from '../shared/components/loading-indicator/loading-indicator.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule,
    TranslatePipe,
    LoadingIndicatorComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registering = false;
  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    password2: new FormControl()
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private dialogService: DialogService,
  ) { }

  async register() {
    if (!this.form.valid) return;

    const { email, password, password2 } = this.form.value;
    if (password != password2) {
      this.dialogService.alert(
        this.translateService.translate("RegistrationFailed"),
        this.translateService.translate("PasswordMismatch"),
        this.translateService.translate("Ok")
      );
      return;
    }

    this.registering = true;

    try {
      await this.authService.register(email, password);
      await this.router.navigate(["recipes"]);
    } catch (error: any) {
      this.dialogService.alert(
        this.translateService.translate("RegistrationFailed"),
        error.toString(),
        this.translateService.translate("Ok")
      );
    } finally {
      this.registering = false;
    }

    // Stop printing FirebaseError to console you useless piece of garbage angular/firebase/angularfire after I catch it
  }
}
