import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { successAlertResetPassword } from 'src/app/utils/global-alerts';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  public formulario: FormGroup;
  public idUser: string;
  public token: string;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private activeRouter:  ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dataBuilder();
    this.activeRouter.params.subscribe((data: any) => {
      this.idUser = data.idUser;
      this.token = data.token;
    })
  }

  private dataBuilder(): void{
    this.formulario = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
    })
  }

  public newPassword(form): void {
    const {newPassword, ...object} = form
    this.authService.newPassword(object, this.idUser , this.token).subscribe((response) => {
      if (response.success){
        console.log(response.message);
        successAlertResetPassword(response.message)
        this.formulario.reset();
        this.router.navigateByUrl('auth/login');
      }
    })
  }

  get validPassword(): boolean {
    return this.formulario.get('password').invalid && this.formulario.get('password').touched
  }

  get validPasswords(): boolean {
    let pass1 = this.formulario.get('password').value;
    let pass2 = this.formulario.get('newPassword').value;
    if(pass1 === pass2){
      return false
    }else{
      return true
    }
  }

}
