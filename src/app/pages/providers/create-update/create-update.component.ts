import { MatSnackBar } from '@angular/material/snack-bar';
import { ProvidersService } from './../../../services/providers.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateProviderComponent implements OnInit {
  
  providerForm: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateUpdateProviderComponent>,
    private fb: FormBuilder,
    private providerService: ProvidersService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.providerForm = this.fb.group({
      "correo": ['', Validators.compose([Validators.required, Validators.email])],
      "razon_social": ['', Validators.compose([Validators.required])],
      "ruc": [null, Validators.compose([Validators.required, Validators.min(9999999), Validators.max(100000000000)])],
      "celular": [null, Validators.compose([Validators.required, Validators.min(99999999), Validators.max(1000000000)])],
      "encargado": ['', Validators.compose([Validators.required])],
      "responsable": "62c35100ecbce325e002fdce"
    });

    if(this.data.mode === 'update') {
      this.providerService.getProvider(this.data.id).subscribe(
        (res: any) => {
          this.providerForm.patchValue({
            razon_social: res.razon_social,
            "encargado": res.encargado,
            "correo": res.correo,
            "ruc": res.ruc,
            "celular": res.celular,
          })
        }
      )
    }
  }

  send(): any {
    this.dialogRef.close(this.providerForm.value)
  }

  update(): void {
    let {razon_social,
      correo,
      ruc,
      celular,
      encargado,
      } = this.providerForm.value;

    let payload: string[] | any = {
      razon_social,
      correo,
      ruc,
      celular,
      encargado,
      responsable: JSON.parse(localStorage.getItem('user')!)._id
    }

    this.providerService.updateProvider(this.data.id, payload).subscribe(
      res => {
        console.log(res)
        this.openSnackBar(`Se actualizo el proveedor: ${razon_social} correctamente!`);
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
