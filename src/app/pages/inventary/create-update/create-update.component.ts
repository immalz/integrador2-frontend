import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from './../../../services/inventory.service';
import { ProvidersService } from './../../../services/providers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

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

  providerList: any;
  materialForm: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateUpdateComponent>,
    private _snackBar: MatSnackBar,
    private providerService: ProvidersService,
    private inventoryService: InventoryService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getProviders();
    this.materialForm = this.fb.group({
      "nombre": [{value:'', disabled: this.data.mode === 'view' ? true : false}, Validators.compose([Validators.required])],
      "fecha_ingreso": [{value:'', disabled: this.data.mode === 'view' ? true : false}, Validators.compose([Validators.required])],
      "precio": [ {value:'', disabled: this.data.mode === 'view' ? true : false}, Validators.compose([Validators.required])],
      "cantidad": [{value:'', disabled: this.data.mode === 'view' ? true : false}, Validators.compose([Validators.required])],
      "proveedor": [{value:'', disabled: this.data.mode === 'view' ? true : false}, Validators.compose([Validators.required])],
      responsable: JSON.parse(localStorage.getItem('user')!)._id
    })
    
    if(this.data.mode === 'view') {
      this.inventoryService.getInventaryByID(this.data.id).subscribe(
        (res: any) => {
          console.log(res);
          this.materialForm.patchValue({
            nombre: res.nombre,
            "fecha_ingreso": res.fecha_ingreso,
            "precio": res.precio,
            "cantidad": res.cantidad,
            "proveedor": res.proveedor[0]._id,
          })
        }
      )
    }
  }

  getProviders(): any {
    this.providerService.getProviders().subscribe(
      res => {
        this.providerList = res
      }
    )
  }

  send(): any {
    
    this.inventoryService.createMaterial(this.materialForm.value).subscribe(
      res => {
        this.dialogRef.close(this.materialForm.value);
        this.openSnackBar('Se registro el usuario correctamente!');
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
