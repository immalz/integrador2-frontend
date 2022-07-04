import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  loginForm: any;

  constructor(
    private router: Router,
    private loginService: AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      "correo": ['', Validators.compose([Validators.required, Validators.email])],
      "contraseña": ['', Validators.compose([Validators.required])],
    })
  }

  login(): any {
    this.loading = true;

    this.loginService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
        localStorage.setItem('user', JSON.stringify(res['userFound']))
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.loading = false;
        this.openSnackBar('Credenciales incorrectas o Usuario no existe');
      }
    )

    // setTimeout(() => {
    //   this.loading = false;
    //   this.router.navigate(['/dashboard']);
    // }, 2000);
   
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

}
