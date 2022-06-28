import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { errorAlert, successAlert } from 'src/app/utils/global-alerts';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formulario: FormGroup;
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
      name: ['', Validators.required],
      tipoCedula: ['', Validators.required],
      cedula: ['', Validators.required],
      firstname: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern('^[0-9]{2}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cellphone: ['', [Validators.required , Validators.pattern('^((\\+57-?)|0)?[0-9]{10}$')]],
      rol: ['', Validators.required],
    })
  }

  public register(form){
    this.authService.registerUser(form).subscribe((resp) => {
      if(resp.success){
        successAlert(resp.user);
        this.formulario.reset();
      }else{
         errorAlert('El correo ya existe')
      }
    }, (err) => {
      // if()
      // errorAlert()
      console.log(err.error.message);
    })
  }
  public login(){
    this.router.navigateByUrl('auth/login');
  }
  public volver(){
    this.router.navigateByUrl('/');
  }

  get validEmail(): boolean {
    return this.formulario.get('email').invalid && this.formulario.get('email').touched
  }
  get validPassword(): boolean {
    return this.formulario.get('password').invalid && this.formulario.get('password').touched
  }
  get validCell(): boolean {
    return this.formulario.get('cellphone').invalid && this.formulario.get('cellphone').touched
  }
  get validAge(): boolean {
    return this.formulario.get('age').invalid && this.formulario.get('age').touched
  }
  get validName(): boolean {
    return this.formulario.get('name').invalid && this.formulario.get('name').touched
  }
  get validTipoCedula(): boolean {
    return this.formulario.get('tipoCedula').invalid && this.formulario.get('tipoCedula').touched
  }
  get validCedula(): boolean {
    return this.formulario.get('cedula').invalid && this.formulario.get('cedula').touched
  }
  get validFirstname(): boolean {
    return this.formulario.get('firstname').invalid && this.formulario.get('firstname').touched
  }
  get validRol(): boolean {
    return this.formulario.get('rol').invalid && this.formulario.get('rol').touched
  }
}
