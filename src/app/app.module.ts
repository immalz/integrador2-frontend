import { DialogConfirm3, MovimientoComponent } from './pages/movimiento/inventary.component';
import { RecordsComponent } from './pages/historial/historial.component';
import { CreateUpdateUserComponent } from './pages/users/create-update/create-update.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DialogConfirm2, InventaryComponent } from './pages/inventary/inventary.component';
import { ProvidersComponent, DialogConfirm } from './pages/providers/providers.component';
import { CreateUpdateComponent } from './pages/inventary/create-update/create-update.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './pages/users/users.component';
import { CreateUpdateProviderComponent } from './pages/providers/create-update/create-update.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateUpdateMovimientoComponent } from './pages/movimiento/create-update/create-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    InventaryComponent,
    ProvidersComponent,
    CreateUpdateComponent,
    CreateUpdateUserComponent,
    CreateUpdateProviderComponent,
    CreateUpdateMovimientoComponent,
    NotFoundComponent,
    GraphicsComponent,
    UsersComponent,
    RecordsComponent,
    DialogConfirm,
    DialogConfirm2,
    DialogConfirm3,
    MovimientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
