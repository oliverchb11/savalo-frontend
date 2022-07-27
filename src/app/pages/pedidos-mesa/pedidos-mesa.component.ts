import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/core/services/articles/article.service';
import { CategoryService } from 'src/app/core/services/categorys/category.service';
import { OrderService } from 'src/app/core/services/orders/order.service';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { TableService } from 'src/app/core/services/tables/table.service';
import { DataCreateArticle } from 'src/app/interfaces/article/data-create-article';
import { DataCreateCategory } from 'src/app/interfaces/category/data-create-category';
import { DataOrders } from 'src/app/interfaces/orders/data-orders';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { DataTable, DataTableOrder } from 'src/app/interfaces/table/data.table';
import { successAlertGlobal } from 'src/app/utils/global-alerts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-mesa',
  templateUrl: './pedidos-mesa.component.html',
  styleUrls: ['./pedidos-mesa.component.scss']
})
export class PedidosMesaComponent implements OnInit {
  public categorys: DataCreateCategory[];
  public articles: DataCreateArticle[];
  public cajeros: RegisterUser[] = [];
  public user: any;
  public mesaData: any;
  public orders: DataOrders;
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
  public pedido2: any[] = [];
  public seBorro = false;
  public cajeroActual: string;
  public cajeroNuevo: string;
  public clienteNuevo: string;
  public subscription: Subscription;
  public ok: number;
  public carrito: {};
  public rolUser: string;
  public nombrePrimeraCategoria: string;
  public cantidadProducto = this.pedido.length;
  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private activeRouter:  ActivatedRoute,
    private tableService: TableService,
    private ordersService: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getArticles()
    this.getCategorys()
    this.getUserLocalStorage()
    this.dataBuilder()
    this.paramsData()
    this.getCajerosUser();
    this.subscription = this.articleService.refresOrder$.subscribe(() => {
      this.getArticles()
    })
  }

  public dataBuilder(): void{
    this.formulario = this.fb.group({
      nameOrder: [''],
      cajero: ['', Validators.required]
    })
  }

  public paramsData(): void{
    this.activeRouter.params.subscribe((params: any) => {
      this.idMesa = params.id;
      this.tableService.tablesById(params.id).subscribe((response) => {
        if(response.success){
          console.log(response);
            this.mesaData = response.tables;
            this.totalOders =     parseInt(response.tables.orders.total.toString());
        

            
            this.optenerCajeroAsignado(response.tables.orders._id)
        }
      })
    })  
  }

  public getCategorys(): void{
    this.categoryService.allCategorys().subscribe((response)=> {
      if(response.success){
        this.categorys = response.category;
        this.nombrePrimeraCategoria = this.categorys[0].name;
        this.categorys.map((resp, i) => {
          if(resp.name === this.nombrePrimeraCategoria){
            this.getArticle(resp._id,i )
          }
        }) 
      }
    })
  }

  public getArticles(): void{
    this.articleService.allArticles().subscribe((response)=> {
      if(response.success){
        this.articles = response.articles.filter((value)=> value.available === 'si' || value.available === '');
      }
    })
  }

    //validar informacion de cada sesion
    // public validUser(category: DataCreateCategory[]): void {
    //   let user = JSON.parse(localStorage.getItem('user'));
    //   let result = category.filter((cate => cate.user === user._id));
    //   this.categorys = result;
    // }

    public getArticle(idCategory : string, iCategory?: number): any {
     let result = this.articles?.filter((article) => article.category === idCategory);
      this.articlesNew = result;
      this.nombrePrimeraCategoria =  this.categorys[iCategory].name;
    }

    public dataArticle(article): void {
 
      if(!this.seBorro){
        console.log(this.pedido2.length);
        this.pedido.push(article)
        article.cantidad ++
        const result = this.pedido.reduce((acc,item)=>{
          if(!acc.includes(item)){
            acc.push(item);
          }
          return acc;
        },[])
        console.log(result);
        
        this.pedido2 = result;
        this.seBorro = false
      }else{
        this.pedido2 = []
        this.pedido = []
        this.total = 0;
        this.seBorro = false
      }

      let contador = 0;
      this.pedido.map((pedido) => {
        contador += pedido.price;
      })
  
  this.subTotal = contador;
  this.total = this.subTotal;
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
      this.rolUser

      const datosCrearPedido = {
        table : this.mesaData._id,
        total: this.total,
        subTotal: this.subTotal,
        nameOrder: nameOrder.nameOrder,
        cajero: (this.rolUser === '1')? nameOrder.cajero : this.cajeroActual,
        articles: this.articlesId,
        articles_cantidad: this.pedido2
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
      console.log('all', this.pedido2[index]);
      // this.subTotal = this.subTotal - ((parseInt(this.pedido[index].price) * parseInt(this.pedido[index].cantidad) ));
      this.pedido2[index].cantidad -= 1;
      // this.pedido[index].cantidad -= 1;
      // this.pedido.splice(index,1)
      // this.pedido2.splice(index,1);
      console.log('importante', this.pedido2[index].cantidad);
      
      this.total = this.total - parseInt(this.pedido2[index].price);
      if(this.pedido2[index].cantidad === 0){
        this.pedido2.splice(index,1);
      }
      // if(this.pedido2.length === 0){
      //   this.seBorro = true;
      // }
    }
    public deletePedidoId(i: number, item): void {
      this.mesaData.articles.splice(i,1);
      console.log(item, i);
      this.orders.articles_cantidad.splice(i,1);
      this.totalOders = 0
    }

    public updateTable(id: string, articles: string[], idOrder: string): void {
      const data = {
        libre: false,
        articles: articles,
        orders: idOrder,
      }
        this.tableService.updateTable(data, id).subscribe((response) => {
          if(response.success){
            console.log(response);
          }
        })
    }


    //meotods para ir opteniendo la data que se puede actualizar
    public optenerCajero(event): void{
      this.cajeroNuevo = event.target.value;
    }
    public changeName(event): void{
      this.clienteNuevo = event.target.value;
    }
    //validacion de articulos para acutliazar
    public articlesUpdate(article): any[]{
      if(article.length > 0 && this.pedido2.length === 0) {
         return article
       }else if(article.length === 0 && this.pedido2.length > 0){
         return this.pedido2
       }else if(article.length > 0 && this.pedido2.length > 0){
        const union = this.pedido2.concat(article)
         return  union;
       }else{
         return []
       }
     }
    public updateOrder(idOrder: string): void {
      Swal.fire({
        title: `Seguro desea actualizar la orden?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Actualizar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.dataUpdate(idOrder)
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info')
        }
      })
    }

    public dataUpdate(idOrder): void{
      let totalUpdate = 0;
      if(this.total === 0 && this.totalOders > 0){
        totalUpdate = this.totalOders;
      }else if(this.total > 0 && this.totalOders === 0){
        totalUpdate = this.total;
      }else if(this.total > 0 && this.totalOders > 0){
        totalUpdate = this.total + this.totalOders;
      }
      const dataUpdate = {
        cajero:  this.cajeroNuevo,
        nameOrder: this.clienteNuevo,
        articles: this.articlesUpdate(this.mesaData.articles),
        articles_cantidad: this.articlesUpdate(this.orders.articles_cantidad),
        total: totalUpdate,
        preparationState: 'preparacion'
      }
      console.log(idOrder, dataUpdate);
      this.ordersService.updateOrder(dataUpdate,idOrder).subscribe((response)=>{
        if(response.success){
          successAlertGlobal('Orden actualizada');
          this.router.navigateByUrl('pages/pedidos')
        }
      })
    }

    //formatear a numero totalOrder
    public formartNumber(total: number): number{
      return total;
    }


    //optener los cajeros disponibles para seleccionar
    public getCajerosUser(): void{
      this.profileService.getAllUsers().subscribe((respose) => {
        if(respose.success){
        let cajeros =  respose.users.filter((user) => user.rol[0] === '2' && user.state);
        this.cajeros = cajeros
        }
      })
    }
    //obtener el cajero asignado de la orden, para actualizar orden
    public optenerCajeroAsignado(idOrder: string): void{
      this.ordersService.getOrderById(idOrder).subscribe((response) => {
        if(response.success){
          console.log('cajero', response?.order?.cajero);
          this.orders = response?.order;
          // this.cajeroActual = response?.order?.cajero;
        }
      })
    }

    public decrementarCantidad(): void{
      this.cantidadProducto -= 1
    }
    public aumentarCantidad(): void{
      this.cantidadProducto += 1
    }

    //obtener usuario del localStorage
    public getUserLocalStorage(): void{
      let user = JSON.parse(localStorage.getItem('user'));
      this.rolUser = user.rol[0];
      this.cajeroActual = user.name;
      console.log(this.rolUser, this.cajeros.length);
    }

    public cancelOrder(): void{
      this.router.navigateByUrl('pages/pedidos')
    }
}
