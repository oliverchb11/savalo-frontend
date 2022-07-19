import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { successAlertGlobal } from 'src/app/utils/global-alerts';
import { roles } from 'src/app/utils/roles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  public user: RegisterUser;
  public previewImg: string | ArrayBuffer = '';
  public rol: string | string[];
  public dataUser: any[] = [];
  public form: any;
  public imagen: string = '';
  public cambioImg = false;
  public id: string ;
  public baseUrl = environment.API_PRODUCTION;
  public formulario: FormGroup;
  constructor(
    private activeRouter: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paramsData();
    this.dataBuilder();
  }
  

  public dataBuilder(): void{
    this.formulario = this.fb.group({
      name: [''],
      firstname: [''],
      email: [''],
      age: [''],
      rol: [''],
      cellphone: ['']
    })
  }
  
  public paramsData(): void{
    this.activeRouter.params.subscribe((response: any) => {
      this.getUserId(response.id);
      this.id = response.id;
    })
  }

  public fileUpload(event): void {
    let file = event.target.files[0];
    let render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () =>{
      this.previewImg = render.result;
      this.imagen = '';
    }
    this.updatePhoto(file);
  }

  public updatePhoto(file: File): void {
    console.log(file);
    this.authService.updateUploadFile(file,'usuarios', this.user?._id).subscribe((response) => {
      if(response.success){
        console.log(response);
        this.cambioImg = true;
      }
    })
  }

  public getUserId(id): void{
    this.authService.listUserById(id).subscribe((response) => {
      if(response.success){
        this.user = response.user;
        this.rol = roles(this.user.rol[0]);
        this.imagen = `${this.baseUrl}upload/usuarios/${this.user.photo}`;
      }
    })
  }

  public updateProfile(form): void {
    if(form.name === ''){
      delete form.name;
      this.form = form;
    }
    if(form.firstname === ''){
      delete form.firstname;
      this.form = form;
    }
    if(form.cellphone === ''){
      delete form.cellphone;
      this.form = form;
    }
    
    if(form.age === ''){
      delete form.age;
      this.form = form;
    }
    
    if(form.rol === ''){
      delete form.rol;
      this.form = form;
    }
    if(form.email === ''){
      delete form.email;
      this.form = form;
    }
    
 console.log(this.form);
 
    this.profileService.updateProfile(this.form, this.id).subscribe((response) => {
      if(response.success){
        successAlertGlobal(response.message);
        this.router.navigateByUrl('pages/perfil')
      }
    })
  }

  get touchInputName(): boolean {
    return this.formulario.get('name').pristine;
  }
  get touchInputLastname(): boolean {
    return this.formulario.get('firstname').pristine;
  }
  get touchInputEmail(): boolean {
    return this.formulario.get('email').pristine;
  }
  get touchInputAge(): boolean {
    return this.formulario.get('age').pristine;
  }
  get touchInputRol(): boolean {
    return this.formulario.get('rol').pristine;
  }
  get touchInputCell(): boolean {
    return this.formulario.get('cellphone').pristine;
  }

  validButtonUpdates(): boolean {
    if(
      !this.touchInputName ||
      !this.touchInputLastname ||
      !this.touchInputEmail ||
      !this.touchInputAge ||
      !this.touchInputRol ||
      !this.touchInputCell ||
      this.cambioImg 
      ){
        return true
      }else{
        
        return false
      }
  }
}
