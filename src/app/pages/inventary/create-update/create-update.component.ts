import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {


  payload = {
    username: '',
    email: '',
    password: '',
    name: '',
    price: null,
    provider: ''
  }

  constructor(
    private dialogRef: MatDialogRef<CreateUpdateComponent>,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  send(): any {
    this.dialogRef.close(this.payload)
    this.openSnackBar('Se registro el usuario correctamente!');
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

}
