import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-listado-alquileres',
  templateUrl: './listado-alquileres.component.html',
  styleUrls: ['./listado-alquileres.component.scss'],
})
export class ListadoAlquileresComponent extends ListComponent {
  OrderType = {
    Patente: 'patente',
    Detalle: 'detalle',
    precioDiario: 'precioDiario',
    precioTotal: 'precioTotal',
    Chofer: 'chofer',
    FechaInicio: 'fechaInicio',
    FechaFin: 'fechaFin',
  };

  orderType: string = this.OrderType.Patente;

  override async ngOnInit(): Promise<void> {
    this.entityType = 'alquileres';
    await super.ngOnInit();
  }

  sortEntities(): void {
    const orderFunctions = {
      [this.OrderType.Patente]: (a: any, b: any) =>
        a.data.patente.localeCompare(b.data.patente),
      [this.OrderType.Detalle]: (a: any, b: any) =>
        a.data.titular.localeCompare(b.data.titular),
      [this.OrderType.Chofer]: (a: any, b: any) =>
        a.data.chofer.localeCompare(b.data.chofer),
      [this.OrderType.FechaInicio]: (a: any, b: any) =>
        new Date(a.data.fechaInicio).getTime() -
        new Date(b.data.fechaInicio).getTime(),
      [this.OrderType.FechaFin]: (a: any, b: any) =>
        new Date(a.data.fechaFin).getTime() -
        new Date(b.data.fechaFin).getTime(),
    };

    this.filteredEntities.sort(orderFunctions[this.orderType]);
  }
}
