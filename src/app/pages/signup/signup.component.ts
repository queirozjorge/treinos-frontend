import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent, CommonModule],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm!: FormGroup;
  isHintVisible: boolean = false;
  hintTop = 0;
  hintLeft = 0;
  dateNow: any;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
      birthDate: new FormControl('', [Validators.required])
    })
  }

  submit() {

    if(this.isValidated()) {
      this.loginService.signup(
        this.signupForm.value.name, 
        this.signupForm.value.password,
        this.signupForm.value.email,
        this.signupForm.value.birthDate
          ).subscribe({
            next: () => {
              this.toastService.success("Cadastro realizado com sucesso!");
              this.navigate();
            },
            error: (err) => this.toastService.error(err.message)
          });
    }
        
  }

  isValidated(): boolean {

    this.dateNow = new Date();
    this.dateNow.setHours(0, 0, 0, 0);
    const pwd = this.signupForm.value.password;

    if (pwd !== this.signupForm.value.passwordConfirm) {
      this.toastService.error("Suas senhas não coincidem. Por favor, verifique e tente novamente.")
      return false;
    } if (new Date(this.signupForm.value.birthDate) > this.dateNow) {
      this.toastService.error("Data de nascimento inválida. Por favor, verifique e tente novamente.")
      return false;
    } if (pwd.length < 8 || !/[A-Z]/.test(pwd) || !/[a-z]/.test(pwd) || !/\d/.test(pwd) || !/[^A-Za-z0-9]/.test(pwd)) {
      this.toastService.error("Senha inválida. Por favor, verifique e tente novamente.")
      return false;
    }
    return true;
  }

  navigate() {
    this.router.navigate(["login"])
  }

  showHint() {
    this.isHintVisible = true;
  }

  hideHint() {
    this.isHintVisible = false;
  }

  updateHintPosition(event: MouseEvent) {
    this.hintTop = event.clientY + 10;
    this.hintLeft = event.clientX + 10;
  }

}
