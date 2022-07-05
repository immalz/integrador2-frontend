import { MovementService } from './../../services/movimiento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryService } from '../../services/inventory.service';
import { CreateUpdateMovimientoComponent } from './create-update/create-update.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface UserData {
  id: string;
  owner: string;
  razon_social: string;
  email: Date;
  ruc: string;
  phone: string;
  salida: Date;
}


@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class MovimientoComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id', 'nombre','tipo','cantidad', 'responsable','fecha', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private movementService: MovementService,
    private _snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource();
    this.getInventory();
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getInventory(): void{
    this.movementService.getMovements().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.reverse();
      }
    )
  }

  create(): any {
    const dialogRef = this.dialog.open(CreateUpdateMovimientoComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getInventory();
    });
  }

  
  deleteMaterial(id: string): void{

    const dialogRef = this.dialog.open(DialogConfirm3);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const payload = {
          responsable: '62c35100ecbce325e002fdce'
        }
        this.movementService.deleteMovement(id, payload).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('Se elimino el proveedor correctamente')
            this.getInventory();
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
export class DialogConfirm3 {

  constructor(
    private dialogRef: MatDialogRef<DialogConfirm3>
  ) {

  }
  deleteConfirm(): void {
    this.dialogRef.close(true);
  }
}


