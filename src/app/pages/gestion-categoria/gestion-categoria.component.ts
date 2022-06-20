import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/article.service';
import { CategoryService } from 'src/app/core/services/categorys/category.service';
import { DataCreateArticle } from 'src/app/interfaces/article/data-create-article';
import { DataCreateCategory } from 'src/app/interfaces/category/data-create-category';
import { successAlertGlobal } from 'src/app/utils/global-alerts';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestion-categoria',
  templateUrl: './gestion-categoria.component.html',
  styleUrls: ['./gestion-categoria.component.scss']
})
export class GestionCategoriaComponent implements OnInit {
  public category: DataCreateCategory;
  public formulario: FormGroup;
  public name: string;
  public nameNew: string;
  constructor(
    private activeRouter:  ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.paramsData();
    this.builderData()
  }

  private builderData(): void{
    this.formulario = this.fb.group({
      name: ['']
    })
  }

  public paramsData(): void{
    this.activeRouter.params.subscribe((response: any) => {
        this.getCategorys(response.id)
    })
  }

  public getCategorys(id: string): void{
    this.categoryService.categoryById(id).subscribe((response) => {
      if(response.success){
        this.category = response.category;
        this.name = this.category.name;
      }
    })
  }


  public nameData(name: string): void{
    this.nameNew = name;
  }
  public editCategory( id: string): void{
    const infoEdit = {
      name: this.nameNew
    }
    this.categoryService.updateCategory(infoEdit, id).subscribe((response) => {
      if(response.success){
        successAlertGlobal(response.message);
        this.router.navigateByUrl('pages/menu')
      }
    })
  }

  public deteleCategory( id: string): void{
    Swal.fire({
      title: `Seguro desea eliminar la categoria ${this.category.name}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.getArticles(id)
        this.categoryService.deleteCategoryById(id).subscribe((response) => {
          if (response.success){
            Swal.fire(response.message, '', 'success');
            this.router.navigateByUrl('pages/menu')
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })
  }

  public getArticles(idCategory): void{
    this.articleService.allArticles().subscribe((resp) => {
      let articlesDelete = resp.articles.filter((value)=> value.category === idCategory);
      this.deleteArticlesForCategory(articlesDelete);
    })
  }

  public deleteArticlesForCategory(article: DataCreateArticle[]): void{
    article.map((resp) => {
      this.articleService.deletearticles(resp._id).subscribe((resp) => {
        if(resp.success){
          console.log('ok delete articles');
        }
      })
    })
  }

}
