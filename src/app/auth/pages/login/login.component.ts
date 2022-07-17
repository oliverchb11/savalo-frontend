import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { saveToken } from 'src/app/core/utils/saveToken';
import { dismissAlertLogin, errorAlert, successAlertLogin } from 'src/app/utils/global-alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  public login(form): void{
    console.log(form);
    this.authService.loginUser(form).subscribe((data) =>{
      if(data.success){
        successAlertLogin();
        saveToken(data.token, data.user);
        setTimeout(() => {
          if(data.user.rol[0] === '1'){
            this.router.navigateByUrl('pages/home');
          }else{
            this.router.navigateByUrl('pages/pedidos');
          }
          dismissAlertLogin()
        }, 2000);
      }else{
        errorAlert(data.message)
      }
    })
  }

  public register(){
    this.router.navigateByUrl('auth/register');
  }
  public olvideClave(){
    this.router.navigateByUrl('auth/reset-password');
  }

  get validEmail(): boolean {
    return this.formulario.get('email').invalid && this.formulario.get('email').touched
  }
  get validPassword(): boolean {
    return this.formulario.get('password').invalid && this.formulario.get('password').touched
  }

}
