import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/core/services/articles/article.service';
import { CategoryService } from 'src/app/core/services/categorys/category.service';
import { DataCreateArticle } from 'src/app/interfaces/article/data-create-article';
import { DataCreateCategory } from 'src/app/interfaces/category/data-create-category';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit {
  public carta: any[] = [];
  public category: DataCreateCategory[];
  public articles: DataCreateArticle[];
  public baseUrl = environment.API_PRODUCTION;
  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {

    this.getCarta(8);
    this.getArticle();
    this.getCategory();
  }


  public getArticle(): void{
    this.articleService.allArticles().subscribe((response) => {
      if(response.success){
        console.log(response);
        this.articles = response.articles.map((resp, i)=>{
          if( resp.visibility === 'si' || resp.visibility === ''){
            return resp
          }else{
            return null
          }
          })

          this.articles = this.articles.filter((resp)=> resp !== null);       
      }
    })
  }
  public getCategory(): void{
    this.categoryService.allCategorys().subscribe((response) => {
      if(response.success){
        this.category = response.category.map((resp, i)=>{
        if( resp.visibility === 'si'){
          return resp
        }else{
          return null
        }
        })
      this.category = this.category.filter((resp)=> resp !== null);       
      }
    })
  }



  public getCarta(numero) {

      this.carta = [
        {
          id: 1,
          img: `assets/carta/Carta Savalo-01.png`
        },
        {
          id: 2,
          img: `assets/carta/Carta Savalo-02.png`
        },
        {
          id: 3,
          img: `assets/carta/Carta Savalo-03.png`
        },
        {
          id: 4,
          img: `assets/carta/Carta Savalo-04.png`
        },
        {
          id: 5,
          img: `assets/carta/Carta Savalo-05.png`
        },
        {
          id: 6,
          img: `assets/carta/Carta Savalo-06.png`
        },
        {
          id: 7,
          img: `assets/carta/Carta Savalo-07.png`
        },
        {
          id: 8,
          img: `assets/carta/Carta Savalo-08.png`
        },
      ]
    
    
  }

}
