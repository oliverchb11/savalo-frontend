import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/article.service';
import { CategoryService } from 'src/app/core/services/categorys/category.service';
import { OrderService } from 'src/app/core/services/orders/order.service';
import { TableService } from 'src/app/core/services/tables/table.service';
import { DataCreateArticle } from 'src/app/interfaces/article/data-create-article';
import { DataCreateCategory } from 'src/app/interfaces/category/data-create-category';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';
import { DataTable, DataTableOrder } from 'src/app/interfaces/table/data.table';
import { successAlertGlobal } from 'src/app/utils/global-alerts';

@Component({
  selector: 'app-pedidos-mesa',
  templateUrl: './pedidos-mesa.component.html',
  styleUrls: ['./pedidos-mesa.component.scss']
})
export class PedidosMesaComponent implements OnInit {
  public categorys: DataCreateCategory[];
  public articles: DataCreateArticle[];
  public mesaData: any;
  public articlesId: string[] = [];
  public articlesNew: DataCreateArticle[];
  public subTotal: number = 0;
  public total: number = 0;
  public totalOders: number = 0;
  public propinaState: boolean = false;
  public servicioState: boolean = false;
  public propinaVal: number = 0;
  public servicioVal: number = 0;
  public formulario: FormGroup;
  public idMesa: string;
  public contador =0;
  public pedido: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private activeRouter:  ActivatedRoute,
    private tableService: TableService,
    private ordersService: OrderService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataBuilder()
    this.getCategorys()
    this.getArticles()
    this.paramsData()
  }

  public dataBuilder(): void{
    this.formulario = this.fb.group({
      nameOrder: ['']
    })
  }

  public paramsData(): void{
    this.activeRouter.params.subscribe((params: any) => {
      this.idMesa = params.id;
      this.tableService.tablesById(params.id).subscribe((response) => {
        if(response.success){
          console.log(response);
            this.mesaData = response.tables;
            this.totalOders = response.tables.orders.total;
          
        }
      })
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

    //validar informacion de cada sesion
    public validUser(category: DataCreateCategory[]): void {
      let user = JSON.parse(localStorage.getItem('user'));
      let result = category.filter((cate => cate.user === user._id));
      this.categorys = result;
    }

    public getArticle(idCategory : string): void {
     let result = this.articles.filter((article) => article.category === idCategory);
      console.log(result);
      this.articlesNew = result;
    }

    public dataArticle(article): void {

      this.pedido.push(article);
      let contador = 0;
      this.pedido.map((pedido) => {
        contador += pedido.price;
      })
      this.subTotal = contador;
      this.total = this.subTotal;
      console.log(contador);
    }

    public servicio(event): void {
      this.servicioState = !this.servicioState;
      if(this.servicioState){
        let valorServicio = parseInt(event.target.value);
        this.servicioVal = (this.subTotal * valorServicio) / 100;
        this.total = this.subTotal + this.servicioVal;
      }else{
        console.log(this.servicioVal);
        
        this.total =  this.total - this.servicioVal ;
      }
      
      
    }
    public propina(event): void {
      this.propinaState = !this.propinaState;
      if(this.propinaState){
        let valorPropina = parseInt(event.target.value);
        this.propinaVal = (this.subTotal * valorPropina) / 100;
        this.total = this.subTotal + this.propinaVal;
      }else{
        console.log(this.propinaVal);
        
        this.total = this.total - this.propinaVal ;
      }
    }

    public crearPedido(nameOrder): void {
      for (let i = 0; i < this.pedido.length; i++){
          this.articlesId.push(this.pedido[i]._id);
      }
      const datosCrearPedido = {
        table : this.mesaData._id,
        total: this.total,
        subTotal: this.subTotal,
        nameOrder: nameOrder.nameOrder,
        articles: this.articlesId
      }
      console.log(datosCrearPedido);
      this.ordersService.createOrder(datosCrearPedido).subscribe((response) => {
        if (response.success){
          successAlertGlobal(response.message);
          this.updateTable(this.idMesa, datosCrearPedido.articles,  response.orders._id)
          this.formulario.reset();
          this.pedido = [];
          this.subTotal = 0;
          this.total = 0;
          this.propinaState = false;
          this.servicioState = false;
          this.router.navigateByUrl('pages/pedidos');
        }
      })
    }

    public deletePedido(index: number): void {
      console.log(this.pedido[index].price, this.subTotal);
      
      this.subTotal = this.subTotal - this.pedido[index].price;
      this.total = this.total - this.pedido[index].price;
      this.pedido.splice(index,1)
    }
    public deletePedidoId(id: string): void {

    }

    public updateTable(id: string, articles: string[], idOrder: string): void {
      const data = {
        libre: false,
        articles: articles,
        orders: idOrder
      }
        this.tableService.updateTable(data, id).subscribe((response) => {
          if(response.success){
            console.log(response);
          }
        })
    }

    public updateOrder(idOrder: string): void {
      console.log(idOrder);
    }
}
