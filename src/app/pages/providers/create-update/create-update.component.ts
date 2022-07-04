import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateProviderComponent implements OnInit {
  
  providerForm: any;

  constructor(
    private dialogRef: MatDialogRef<CreateUpdateProviderComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.providerForm = this.fb.group({
      "correo": ['', Validators.compose([Validators.required, Validators.email])],
      "razon_social": ['', Validators.compose([Validators.required])],
      "ruc": [null, Validators.compose([Validators.required, Validators.min(9999999), Validators.max(100000000000)])],
      "celular": [null, Validators.compose([Validators.required, Validators.min(99999999), Validators.max(1000000000)])],
      "encargado": ['', Validators.compose([Validators.required])],
      "responsable": "62c35100ecbce325e002fdce"
    })
  }

  send(): any {
    this.dialogRef.close(this.providerForm.value)
  }


  

}
