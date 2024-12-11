import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  private auth: AuthService = inject(AuthService)
  private router: Router = inject(Router)

  credentials: Credentials = {
    email: "e@e.e",
    password: "password"
  }

  onSubmit(form: HTMLFormElement) {
    if(form.checkValidity()) {
      console.log("credentials", this.credentials)
      this.auth.login(this.credentials).subscribe({
        next: response => {
          console.log("response in loginComponent", response)
          this.router.navigate(['/home'])
          // form.reset() //pas besoin car redirection
        },
        error: err => console.log(err)
      })
    }
  }
}

export interface Credentials {
  email: string,
  password: string
}

