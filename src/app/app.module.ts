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
import { InventaryComponent } from './pages/inventary/inventary.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { CreateUpdateComponent } from './pages/inventary/create-update/create-update.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './pages/users/users.component';
import { CreateUpdateProviderComponent } from './pages/providers/create-update/create-update.component';

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
    NotFoundComponent,
    GraphicsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
