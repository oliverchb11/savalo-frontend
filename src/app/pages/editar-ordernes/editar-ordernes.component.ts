import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/article.service';
import { CategoryService } from 'src/app/core/services/categorys/category.service';
import { OrderService } from 'src/app/core/services/orders/order.service';
import { TableService } from 'src/app/core/services/tables/table.service';
import { DataCreateArticle } from 'src/app/interfaces/article/data-create-article';
import { DataCreateCategory } from 'src/app/interfaces/category/data-create-category';
import { DataTable } from 'src/app/interfaces/table/data.table';

@Component({
  selector: 'app-editar-ordernes',
  templateUrl: './editar-ordernes.component.html',
  styleUrls: ['./editar-ordernes.component.scss']
})
export class EditarOrdernesComponent implements OnInit {
  public categorys: DataCreateCategory[];
  public articles: DataCreateArticle[];
  public mesaData: DataTable;
  constructor(
    private activeRouter:  ActivatedRoute,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private tableService: TableService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
  }

  public paramsData(): void{
    this.activeRouter.params.subscribe((params: any) => {
      this.orderService.getOrderById(params.id).subscribe((response) => {
        this.tableGet(response.orders.table._id)
      })
    })  
  }

  public tableGet(id: string): void {
    this.tableService.tablesById(id).subscribe((response) => {
      if(response.success){
        console.log(response);
          this.mesaData = response.tables
      }
    })
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
        this.articles = response.articles;
      }
    })
  }

  public validUser(category: DataCreateCategory[]): void {
    let user = JSON.parse(localStorage.getItem('user'));
    let result = category.filter((cate => cate.user === user._id));
    this.categorys = result;
  }

}
