import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUpdateProviderComponent } from './create-update/create-update.component';

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProvidersService } from 'src/app/services/providers.service';


export interface UserData {
  id: string;
  owner: string;
  razon_social: string;
  email: string;
  ruc: string;
  phone: string;
}


@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id', 'owner', 'razon_social', 'email', 'ruc', 'phone', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private providerService: ProvidersService,
    private _snackBar: MatSnackBar,
  ) {    
    this.dataSource = new MatTableDataSource();
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getProviders();
  }

  getProviders(): void{
    this.providerService.getProviders().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.reverse();
      }
    )
  }

  create(): any {
    const dialogRef = this.dialog.open(CreateUpdateProviderComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.providerService.createProvider(result).subscribe (
        res => {
          console.log(res)
          this.openSnackBar('Se registro el proveedor correctamente!');
          this.getProviders();
        },
        err => {
          console.log(err)
        }
      )
    });
  }

  deleteProvider(id: number): void{

    const dialogRef = this.dialog.open(DialogConfirm);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const payload = {
          responsable: '62c35100ecbce325e002fdce'
        }
        this.providerService.deleteProvider(id, payload).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('Se elimino el proveedor correctamente')
            this.getProviders();
          },
          err => {
            console.log(err);
          }
        )
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'confirm.component.html',
})
export class DialogConfirm {

  constructor(
    private dialogRef: MatDialogRef<DialogConfirm>
  ) {

  }
  deleteConfirm(): void {
    this.dialogRef.close(true);
  }
}

