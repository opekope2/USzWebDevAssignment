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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router, private translateService: TranslateService) { }

  async login() {
    if (!this.form.valid) return;

    const { email, password } = this.form.value;

    try {
      await this.authService.login(email, password);
      await this.router.navigate(["recipes"]);
    } catch (error) {
      alert(this.translateService.translate("LoginFailed"));
    }

    // Stop printing FirebaseError to console you useless piece of garbage angular/firebase/angularfire after I catch it
  }
}
