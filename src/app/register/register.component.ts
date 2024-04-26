import { AuthService } from '../shared/services/auth.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from "@angular/material/tabs"
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    password2: new FormControl()
  });

  constructor(private authService: AuthService) { }

  async register() {
    if (!this.form.valid) return;

    const { email, password, password2 } = this.form.value;
    if (password != password2) {
      alert("Passwords don't match");
      return;
    }
    await this.authService.register(email, password);
    // TODO
  }
}
