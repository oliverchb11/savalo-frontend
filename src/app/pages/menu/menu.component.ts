import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/article.service';
import { CategoryService } from 'src/app/core/services/categorys/category.service';
import { DataCreateArticle } from 'src/app/interfaces/article/data-create-article';
import { DataCreateCategory } from 'src/app/interfaces/category/data-create-category';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public isVisible: boolean = false;
  public categorys: DataCreateCategory[];
  public articles: DataCreateArticle[];
  public state = false;
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.getCategorys();
    this.getArticles();
 
  }

  public addCategory(): void{
    this.router.navigateByUrl('pages/nueva-categoria')
  }

  public getCategorys(): void{
    this.categoryService.allCategorys().subscribe((response)=> {
      if(response.success){
        this.validUser(response.category)
      }
    })
  }
  public getArticles(): void{
    this.articleService.allArticles().subscribe((response)=> {
      if(response.success){
        this.validUserArticles(response.articles);
      }
    })
  }

  public addArticle(id: string): void{
    this.router.navigateByUrl(`pages/nuevo-articulo/${id}`);
  }

  //validar informacion de cada sesion
  public validUser(category: DataCreateCategory[]): void {
    let user = JSON.parse(localStorage.getItem('user'));
    let result = category.filter((cate => cate.user === user._id));
    this.categorys = result;
  }
  public validUserArticles(articles: DataCreateArticle[]): void {
    let user = JSON.parse(localStorage.getItem('user'));
    let result = articles.filter((cate => cate.user === user._id));
    this.articles = result;
  }

  public gestionCategoy(category): void {
    console.log(category);
    this.router.navigate(['pages/gestion-categoria', category._id])
  }
  public gestionArticle(article): void {
    console.log(article);
    this.router.navigate(['pages/gestion-articulo', article._id])
  }

}
