import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/article.service';
import { CategoryService } from 'src/app/core/services/categorys/category.service';
import { DataCreateCategory } from 'src/app/interfaces/category/data-create-category';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { successAlertGlobal } from 'src/app/utils/global-alerts';

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
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private router: Router,
    private activeRouter: ActivatedRoute
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
      amount: ['', Validators.required],
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
      }
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



}
