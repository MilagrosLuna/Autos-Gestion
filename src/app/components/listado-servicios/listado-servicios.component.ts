import { Component } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/servicesAndUtils/confirmation.service';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';
import { ModifyComponent } from '../modals/modify/modify.component';
import { DeleteComponent } from '../modals/delete/delete.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-listado-servicios',
  templateUrl: './listado-servicios.component.html',
  styleUrls: ['./listado-servicios.component.scss'],
})
export class ListadoServiciosComponent extends ListComponent {
  OrderType = {
    Patente: 'patente',
    Precio: 'precio',
  };
  orderType: string = this.OrderType.Patente;

  override async ngOnInit(): Promise<void> {
    this.entityType = 'servicios';
    await super.ngOnInit();
  }

  sortEntities() {
    const orderFunctions = {
      [this.OrderType.Patente]: (a: any, b: any) =>
        a.data.patente && b.data.patente
          ? a.data.patente.localeCompare(b.data.patente)
          : 0,
      [this.OrderType.Precio]: (a: any, b: any) =>
        a.data.precio - b.data.precio,
    };

    this.filteredEntities.sort(
      orderFunctions[this.orderType] ||
        ((a: any, b: any) => a.data.cliente.localeCompare(b.data.cliente))
    );
  }
}
