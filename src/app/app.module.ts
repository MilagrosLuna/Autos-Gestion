import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { AltaComponent } from './components/alta/alta.component';
import { ListadoComponent } from './components/listado-autos/listado.component';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { ListadoServiciosComponent } from './components/listado-servicios/listado-servicios.component';
import { CurrencyPipe } from '@angular/common';
import { ModifyComponent } from './components/modals/modify/modify.component';
import { DeleteComponent } from './components/modals/delete/delete.component';
import { ListComponent } from './components/list/list.component';
import { ListadoAlquileresComponent } from './components/listado-alquileres/listado-alquileres.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleComponent } from './components/detalle/detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ErrorPageComponent,
    HomeComponent,
    AltaComponent,
    ListadoComponent,
    AlquilerComponent,
    CuentasComponent,
    ServicioComponent,
    ListadoServiciosComponent,
    ModifyComponent,
    DeleteComponent,
    ListComponent,
    ListadoAlquileresComponent,
    InicioComponent,
    DetalleComponent,
  ],
  imports: [
    CurrencyPipe,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,

    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
