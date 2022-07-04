import { UserService } from './../../services/users.service';
import { MatDialog } from '@angular/material/dialog';

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CreateUpdateUserComponent } from './create-update/create-update.component';


export interface UserData {
  id: string;
  name: string;
  email: string;
}

const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.dataSource = new MatTableDataSource();
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getUsers();
  }

  getUsers(): void{
    this.userService.getUsers().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.reverse();
      }
    )
  }

  create(): any {
    const dialogRef = this.dialog.open(CreateUpdateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Payload a enviar: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
