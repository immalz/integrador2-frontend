import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryService } from './../../services/inventory.service';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
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
export class InventaryComponent implements AfterViewInit  {

  displayedColumns: string[] = ['nombre','razon_social', 'stock','owner', 'email', 'ruc', 'actions'];
  dataSource: MatTableDataSource<UserData>;
  rol: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private inventaryService: InventoryService,
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

  getInventory(): void{
    this.inventaryService.getInventary().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.reverse();
      }
    )
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
      docResult.save(`${new Date().toISOString()}-inventario.pdf`);
    });
  }


  create(): any {
    const dialogRef = this.dialog.open(CreateUpdateComponent,{
      data: {
        mode: 'create',
        id: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getInventory();
        this.openSnackBar(`se creo el Producto: ${result.nombre}`)
      }
    });
  }

  update(id: number): any {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        mode: 'view',
        id
      }
    });
  }

  
  deleteMaterial(id: string): void{

    const dialogRef = this.dialog.open(DialogConfirm2);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const payload = {
          responsable: JSON.parse(localStorage.getItem('user')!)._id
        }
        this.inventaryService.deleteInventory(id, payload).subscribe(
          (res: any) => {
            console.log(res);
            this.openSnackBar( res.message || 'Se elimino el material correctamente')
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
export class DialogConfirm2 {

  constructor(
    private dialogRef: MatDialogRef<DialogConfirm2>
  ) {

  }
  deleteConfirm(): void {
    this.dialogRef.close(true);
  }
}


