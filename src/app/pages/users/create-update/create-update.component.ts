import { UserService } from './../../../services/users.service';
import { AuthService } from './../../../services/auth.service';
import { CustomValidators } from './password-check.validators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateUserComponent implements OnInit {
  
  userForm: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateUpdateUserComponent>,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    if(this.data.mode === 'update') {
      this.userService.getUser(this.data.id).subscribe(
        (res: any) => {
          console.log(res);
          this.userForm.patchValue({
            nombre: res.nombre,
            "correo": res.correo,
            "contraseña": '',
            "repetir_contraseña": '',
            "roles": res.roles[0].nombre,
          })
        }
      )
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      'nombre': ['', Validators.compose([Validators.required])],
      'correo': ['', Validators.compose([Validators.required])],
      'contraseña': [{value: '', disabled: this.data.mode === 'create' ? false : true}, Validators.compose([Validators.required])],
      'repetir_contraseña': [{value: '', disabled: this.data.mode === 'create' ? false : true}, Validators.compose([Validators.required])],
      'roles': ['', Validators.compose([Validators.required])]
    })

    this.userForm.get('repetir_contraseña').setValidators(
      CustomValidators.equals(this.userForm.get('contraseña'))
    );
  }

  update(): void {
    let {nombre, correo, roles} = this.userForm.value;

    let payload: string[] | any = {
      nombre,
      correo,
      roles: [roles],
      responsable: JSON.parse(localStorage.getItem('user')!)._id
    }

    this.userService.updateUser(this.data.id, payload).subscribe(
      res => {
        console.log(res)
        this.openSnackBar(`Se actualizo el usuario: ${nombre} correctamente!`);
        this.dialogRef.close(payload)
      },
      err => {
        console.log(err)
        this.openSnackBar(err.error.message || 'Ha ocurrido un error, vuelva a intentarlo!');
      }
    )
  }

  send(): any {
    let {nombre, correo, contraseña, roles} = this.userForm.value;

    let payload: string[] | any = {
      nombre,
      correo,
      contraseña,
      roles: [roles],
      responsable: JSON.parse(localStorage.getItem('user')!)._id
    }
    console.log(payload)

    this.authService.register(payload).subscribe(
      res => {
        console.log(res)
        this.openSnackBar(`Se registro el usuario: ${nombre} correctamente!`);
        this.dialogRef.close(payload)
      },
      err => {
        console.log(err)
        this.openSnackBar(err.error.message || 'Ha ocurrido un error, vuelva a intentarlo!');
      }
    )
    
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  

}
