import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './services/auth.guard';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { InventaryComponent } from './pages/inventary/inventary.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './pages/historial/historial.component';
import { MovimientoComponent } from './pages/movimiento/inventary.component';

const routes: Routes = [
  {path: 'acceder', component: LoginComponent},
  {path: 'dashboard',canActivate: [AuthGuard] , component: DashboardComponent, children: [
    
    {path: '', component: GraphicsComponent},
    {path: 'inventario', component: InventaryComponent},
    {path: 'usuarios', component: UsersComponent},
    {path: 'proveedores', component: ProvidersComponent},
    {path: 'entrada-salida', component: MovimientoComponent},
    {path: 'historial', component: RecordsComponent},
  ]},
  {path: '', redirectTo:'dashboard', pathMatch: 'full' },
  {path:'**', pathMatch: 'full', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
