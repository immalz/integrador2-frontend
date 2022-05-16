import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateUserComponent implements OnInit {
  
  payload = {
    username: '',
    email: '',
    password: ''
  }

  constructor(
    private dialogRef: MatDialogRef<CreateUpdateUserComponent>,
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
