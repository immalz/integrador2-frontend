import { MovementService } from './../../services/movimiento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryService } from '../../services/inventory.service';
import { CreateUpdateMovimientoComponent } from './create-update/create-update.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {AfterViewInit, Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  displayedColumns: string[] = [ 'nombre','tipo','cantidad', 'stock', 'responsable','fecha', 'actions'];
  dataSource: MatTableDataSource<UserData>;
  rol: string = '';
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
    this.rol = JSON.parse(localStorage.getItem('user')!).roles[0].nombre;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  downloadPDF() {
    const DATA: HTMLElement = document.getElementById('htmlData')!;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}-movimientos.pdf`);
    });
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
        const userid = JSON.parse(localStorage.getItem('user')!)._id;
         
        const payload = {
          responsable: userid
        }
        this.movementService.deleteMovement(id, payload).subscribe(
          (res: any) => {
            this.openSnackBar(res.message)
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


