import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/categorys/category.service';
import { errorAlert, successAlertGlobal } from 'src/app/utils/global-alerts';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {
  public formulario: FormGroup;
  public id: string;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataBuilder();
    this.userInfoStorage();
  }
  public userInfoStorage(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.id = user._id;
    console.log(this.id);
    
  }
  private dataBuilder(): void{
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      visibility: [''],
    })
  }

  public createCategory(form): void{
    console.log(form);
    const {...object} = form;
    object.user = this.id;
    this.categoryService.createCategory(object).subscribe((response) => {
      if(response.success){
        successAlertGlobal(response.message);
        this.router.navigateByUrl('pages/menu');
      }
    }, (error) => {
      console.log(error);
      errorAlert(error.error.message);
    })
  }

}
