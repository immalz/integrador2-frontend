import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUpdateProviderComponent } from './create-update/create-update.component';

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProvidersService } from 'src/app/services/providers.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  displayedColumns: string[] = ['owner', 'razon_social', 'email', 'ruc', 'phone','date', 'actions'];
  dataSource: MatTableDataSource<UserData>;
  rol: string = '';
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
    this.rol = JSON.parse(localStorage.getItem('user')!).roles[0].nombre;
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
    const dialogRef = this.dialog.open(CreateUpdateProviderComponent,{
      data: {
        mode: 'create',
        id: ''
      }
    });

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

  update(id: string): void {
    const dialogRef = this.dialog.open(CreateUpdateProviderComponent,{
      data: {
        mode: 'update',
        id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getProviders();
      }
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
      docResult.save(`${new Date().toISOString()}-proveedores.pdf`);
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

