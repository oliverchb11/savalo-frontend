import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/article.service';
import { DataCreateArticle } from 'src/app/interfaces/article/data-create-article';
import { successAlertGlobal } from 'src/app/utils/global-alerts';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestion-articulos',
  templateUrl: './gestion-articulos.component.html',
  styleUrls: ['./gestion-articulos.component.scss']
})
export class GestionArticulosComponent implements OnInit {
  public article: DataCreateArticle;
  public name: string;
  public nameNew: string;
  public description: string;
  public descriptionNew: string;
  public price: number;
  public priceNew: number;
  public amount: number;
  public amountNew: number;
  public visibility: string;
  public visibilityNew: string;
  public available: string;
  public availableNew: string;
  constructor(
    private activeRouter:  ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.paramsData()
  }

  public paramsData(): void{
    this.activeRouter.params.subscribe((response: any) => {
        this.getCategorys(response.id)
    })
  }
  public getCategorys(id: string): void{
    this.articleService.articlesById(id).subscribe((response) => {
      if(response.success){
        this.article = response.article;
        this.name = this.article.name;
        this.price = this.article.price;
        this.amount = this.article.amount;
        this.description = this.article.description;
        this.visibility = this.article.visibility;
        this.available = this.article.available
      }
    })
  }

  public nameData(name): void{
   this.nameNew = name;
  }
  public amountData(amount): void{
   this.amountNew = amount;
  } 
   public priceData(price): void{
   this.priceNew = price;
  }
  public descriptionData(description): void{
    this.descriptionNew = description;
  }
  public visibilityData(visibility): void{
  this.visibilityNew = visibility.target.value;
  
 }
  public availableData(available): void{
  this.availableNew = available.target.value;
  
 }
  public editCategory(id: string): void{
    const data = {
      name: this.nameNew,
      price: this.priceNew,
      amount: this.amountNew,
      description: this.descriptionNew,
      visibility: this.visibilityNew,
      available: this.availableNew
    }
    if(data.name === undefined){
      delete data.name;
    }
    if(data.price === undefined){
      delete data.price;
    }
    if(data.amount === undefined){
      delete data.amount;
    }
    if(data.description === undefined){
      delete data.description;
    }
    if(data.visibility === undefined){
      delete data.visibility;
    }
    if(data.available === undefined){
      delete data.available;
    }
    if(Object.entries(data).length !== 0){
      console.log(data); 
      this.articleService.updateArticle(data, id).subscribe((response) => {
        if(response.success){
          successAlertGlobal(response.message);
          this.router.navigateByUrl('pages/menu')
        }
      })
    }
    
  }
  public deteleCategory(id: string): void{
    Swal.fire({
      title: `Seguro desea eliminar el producto ${this.article.name}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.articleService.deletearticles(id).subscribe((response) => {
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

}
