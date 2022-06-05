import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public dateNow = new Date();
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  public login(){
   this.router.navigateByUrl('auth/login');
  }
  public register(){
   this.router.navigateByUrl('auth/register');
  }
}
