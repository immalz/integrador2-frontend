import { ProvidersService } from 'src/app/services/providers.service';
import { UserService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {


  lastUser: any;
  lastProvider: any = null;
  constructor(
    private userService: UserService,
    private providerService: ProvidersService,

  ) { }

  ngOnInit(): void {
    this.getLatUser();
    this.getLastProvider();
  }


  getLatUser(): any {
    this.userService.getUsers().subscribe(
      (res: any) => {
        let lastItem = res.length-1
        this.lastUser = res[lastItem];
      }
    )
  }

  getLastProvider(): any {
    this.providerService.getProviders().subscribe(
      (res: any) => {
        let lastItem = res.length-1
        this.lastProvider = res[lastItem];
      }
    )
  }

}
