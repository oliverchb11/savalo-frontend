import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/article.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/categorys/category.service';
import { DataCreateCategory } from 'src/app/interfaces/category/data-create-category';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { errorAlert, successAlertGlobal } from 'src/app/utils/global-alerts';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  public category: DataCreateCategory;
  public categoryId: string;
  public userId: RegisterUser;
  public formulario: FormGroup;
  public previewImg: string | ArrayBuffer;
  public file: any
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.dataBuilder();
    this.paramsId();
    this.userInfoStorage();
  }

  private dataBuilder(): void{
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      amount: [''],
      description: [''],
      available: [''],
      visibility: [''],
      photo: [''],
    })
  }
  public userInfoStorage(): void {
    this.userId = JSON.parse(localStorage.getItem('user'));
  }

  public createArticle(form): void {
    const {...object} = form;
    object.user = this.userId._id;
    object.category = this.categoryId;
    console.log(object);
    this.articleService.createArticle(object).subscribe((response) => {
      if(response.success){
        this.formulario.reset();
        successAlertGlobal(response.message);
        this.router.navigateByUrl('pages/menu');
        console.log('Respuiesta creacion', response.article);
        
        this.updatePhoto(this.file, response.article._id);
      }
    }, err =>{
      errorAlert(err.error.message)
    })
  }

  public paramsId(): void {
    this.activeRouter.params.subscribe((id: any) => {
      this.categoryId = id.id;
      this.articlesId(id.id);
    })  
  }

  public articlesId(id: string): void {
    this.categoryService.categoryById(id).subscribe((response) => {
      if(response.success){
        this.category = response.category;
        console.log(this.category);
      }
    })
  }

  public fileUpload(event): void {
    let file = event.target.files[0];
    this.file = file;
    let render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () =>{
      this.previewImg = render.result;
    }
   
  }

  public updatePhoto(file: File, idArticle: string): void {
    console.log(file, idArticle);
    this.authService.updateUploadFile(file,'productos', idArticle).subscribe((response) => {
      if(response.success){
        console.log(response);
      }
    })
  }



}
