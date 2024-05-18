import { Component } from '@angular/core';
// import { MdbModalService } from 'mdb-angular-ui-kit/modal';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent extends ListComponent {
  
  OrderType = {
    Patente: 'patente',
    Titular: 'titular',
    Aseguradora: 'aseguradora',
    Kilometraje: 'kilometraje',
    Multas: 'multas',
    Chofer: 'chofer',
  };

  orderType: string = this.OrderType.Patente;

  override async ngOnInit(): Promise<void> {
    this.entityType = 'autos';
    await super.ngOnInit();
  }

  sortEntities(): void {
    const orderFunctions = {
      [this.OrderType.Patente]: (a: any, b: any) =>
        a.data.patente && b.data.patente
          ? a.data.patente.localeCompare(b.data.patente)
          : 0,
      [this.OrderType.Titular]: (a: any, b: any) =>
        a.data.titular && b.data.titular
          ? a.data.titular.localeCompare(b.data.titular)
          : 0,
      [this.OrderType.Aseguradora]: (a: any, b: any) =>
        a.data.aseguradora && b.data.aseguradora
          ? a.data.aseguradora.localeCompare(b.data.aseguradora)
          : 0,
      [this.OrderType.Chofer]: (a: any, b: any) =>
        a.data.chofer && b.data.chofer
          ? a.data.chofer.localeCompare(b.data.chofer)
          : 0,
      [this.OrderType.Kilometraje]: (a: any, b: any) =>
        a.data.kilometraje - b.data.kilometraje,
      [this.OrderType.Multas]: (a: any, b: any) =>
        a.data.multas - b.data.multas,
    };

    this.filteredEntities.sort(orderFunctions[this.orderType]);
  }
}
