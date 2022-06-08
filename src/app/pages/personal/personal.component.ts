import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { RegisterUser } from 'src/app/interfaces/register-user';
import { roles } from 'src/app/utils/roles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public users: RegisterUser[];
  public baseUrl = environment.API_PRODUCTION;
  public cargo: string
  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getUsuersAll();
  }

  public getUsuersAll(): void {
    this.profileService.getAllUsers().subscribe((response) => {
      if(response.success){
        console.log(response.users);
        this.users = response.users;
      }
    })
  }



}
