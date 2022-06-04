import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { errorAlert, successAlertResetPassword } from 'src/app/utils/global-alerts';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public formulario: FormGroup
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.dataBuilder();
  }

  private dataBuilder(): void{
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    })
  }

  public resetPassword(form): void {
    console.log(form);
    this.authService.resetPassword(form).subscribe((response) => {
      if(response.success){
        successAlertResetPassword(response.message);
        this.formulario.reset();
      }else {
        errorAlert(response.message);
      }
    }, (err) => {
      console.log(err.error);
      
      errorAlert(err.error.message);
    })
  }
  public volver(): void {
    this.router.navigateByUrl('auth/login')
  }

  get validEmail(): boolean {
    return this.formulario.get('email').invalid && this.formulario.get('email').touched
  }
}
