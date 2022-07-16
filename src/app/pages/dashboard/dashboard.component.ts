import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toggle: boolean = false;
  rol: string = '';
  constructor() { }

  ngOnInit(): void {
    this.rol = JSON.parse(localStorage.getItem('user')!).roles[0].nombre;
    console.log(this.rol)
  }

}
