import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AbstractFormComponent } from '../../tools/abstract-form/abstract-form.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends AbstractFormComponent{

  passwordControl: FormControl = new FormControl("", {
    validators: [
      Validators.required,
      Validators.minLength(6)
    ]
  })

  form: FormGroup = new FormGroup<any>({
    id: new FormControl(0),
    username: new FormControl("", { validators: [Validators.required] }),
    email: new FormControl("", { validators: [Validators.required, Validators.email] }),
    password: this.passwordControl
  })

  constructor(private auth: AuthService, private router: Router) {
    super();
  }

  onSubmit$(): void {
    this.auth.register(this.form.value).subscribe(() => this.router.navigate(['login']))
  }

}

export interface User {
  id: number,
  username: string,
  email: string,
  password: string,
}
