import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../services/loading.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, PrimaryInputComponent, ReactiveFormsModule],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export class RecoveryPasswordComponent {
  recoverForm!: FormGroup;

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private loadingService: LoadingService,
    private loginService: LoginService
  ) {
    this.recoverForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('')
    })
  }

  submit() {
    this.loginService.recoverPassword(this.recoverForm.value.email, "http://localhost:4200/new-password").subscribe({
      next: () => { 
        this.toastService.success("Email enviado com sucesso");
        this.loadingService.loadRouter("login");
      },
      error: (err) => {
        this.toastService.error(err.message);
      }
    })
  }

  navigate() {
    this.loadingService.loadRouter("login");
  }
}
