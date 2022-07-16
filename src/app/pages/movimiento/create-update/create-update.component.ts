import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from './../../../services/inventory.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MovementService } from 'src/app/services/movimiento.service';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateMovimientoComponent implements OnInit {


  payload = {
    username: '',
    email: '',
    password: '',
    name: '',
    price: null,
    provider: ''
  }

  listProvider: any = [];
  listProducts: any = [];
  movForm: any;
  constructor(
    private dialogRef: MatDialogRef<CreateUpdateMovimientoComponent>,
    private _snackBar: MatSnackBar,
    private providerService: ProvidersService,
    private productService: InventoryService,
    private fb: FormBuilder,
    private movementService : MovementService
  ) { }

  ngOnInit(): void {
    this.initialForm();
    this.getProviders();
    this.getProducts();
  }

 initialForm(): any {
   this.movForm = this.fb.group({
    'material': [null, Validators.compose([Validators.required])],
    'tipo': ['', Validators.compose([Validators.required])],
    'valor': ['', Validators.compose([Validators.required])],
    "responsable": JSON.parse(localStorage.getItem('user') || '')._id
   })
 }


  getProviders(): any {
    this.providerService.getProviders().subscribe(
      (res: any) => {
        this.listProvider = res.reverse();
      }
    )
  }
  getProducts(): any {
    this.productService.getInventary().subscribe(
      (res: any) => {
        this.listProducts = res.reverse();
      }
    )
  }

  getValueMaterial(valorFormulario: any, montoMaterial: any, type: any): any {
    if(type === 'entrada') {
      return Number(montoMaterial) + Number(valorFormulario)
    } else {
      if((Number(montoMaterial) - Number(valorFormulario)) <= 0) {
        return 0;
      } else {
        return Number(montoMaterial - valorFormulario)
      }
    }
  }

  send(): any {

    const {valor, tipo, material, responsable} = this.movForm.value

    const product = this.listProducts.find((element: any) => element._id === material)
    
    let resultado = this.getValueMaterial(valor, product.cantidad, tipo);

    const payload = {
      tipo,
      material,
      responsable,
      stock: resultado,
      valor
    }
    console.log(payload)

    this.movementService.createMovement(payload).subscribe(
      (res: any) => {
        this.dialogRef.close(this.movForm.value)
        this.openSnackBar(res.message || 'Se registro correctamente!');
      }, 
      err => {
        console.log(err);
        this.openSnackBar('Ha ocurrido un error!');
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
