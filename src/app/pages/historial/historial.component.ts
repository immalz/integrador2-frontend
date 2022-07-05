import { HistorialService } from './../../services/historial.service';
import { UserService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface UserData {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-records',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class RecordsComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id', 'date', 'module', 'description','responsible'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private historialService: HistorialService
  ) {
    this.dataSource = new MatTableDataSource();
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getRecords();
  }

  getRecords(): void{
    this.historialService.getHistory().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.reverse();
      }
    )
  }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
