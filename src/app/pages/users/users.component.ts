import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/users.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CreateUpdateUserComponent } from './create-update/create-update.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface UserData {
  id: string;
  name: string;
  email: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit  {

  displayedColumns: string[] = ['name', 'email', 'role','date', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar
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

  deleteUser(id: number): void{

    const dialogRef = this.dialog.open(DialogConfirm4);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
         
        const payload = {
          responsable: JSON.parse(localStorage.getItem('user')!)._id
        }
        console.log(id);
        this.userService.deleteUser(id, payload).subscribe(
          (res: any) => {
            this.openSnackBar(res.message)
            this.getUsers();
          },
          err => {
            console.log(err);
          }
        )
      }
    });
  }

  update(id: string): void {
    const dialogRef = this.dialog.open(CreateUpdateUserComponent,{
      data: {
        mode: 'update',
        id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getUsers();
      }
    });
  }


  create(): void {
    const dialogRef = this.dialog.open(CreateUpdateUserComponent, {
      data: {
        mode: 'create',
        id: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getUsers();
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
      docResult.save(`${new Date().toISOString()}-usuarios.pdf`);
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
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

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'confirm.component.html',
})

export class DialogConfirm4 {

  constructor(
    private dialogRef: MatDialogRef<DialogConfirm4>
  ) {

  }
  deleteConfirm(): void {
    this.dialogRef.close(true);
  }
}