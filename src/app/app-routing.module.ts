import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AuthGuard } from './servicesAndUtils/guard';
import { AltaComponent } from './components/alta/alta.component';
import { ListadoComponent } from './components/listado-autos/listado.component';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ListadoServiciosComponent } from './components/listado-servicios/listado-servicios.component';
import { ListadoAlquileresComponent } from './components/listado-alquileres/listado-alquileres.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleComponent } from './components/detalle/detalle.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset', component: ResetPasswordComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'altaAuto', component: AltaComponent },
      { path: 'altaAlquiler', component: AlquilerComponent },
      { path: 'altaServicio', component: ServicioComponent },
      { path: 'listadoAutos', component: ListadoComponent },
      { path: 'listadoServicios', component: ListadoServiciosComponent },
      { path: 'listadoAlquileres', component: ListadoAlquileresComponent },
      { path: 'cuentas', component: CuentasComponent },
      { path: 'detalles', component: DetalleComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
