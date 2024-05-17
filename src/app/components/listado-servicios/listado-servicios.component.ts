import { Component } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/servicesAndUtils/confirmation.service';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';
import { ModifyServicioComponent } from '../modals/modify-servicio/modify-servicio.component';
import { DeleteServicioComponent } from '../modals/delete-servicio/delete-servicio.component';

@Component({
  selector: 'app-listado-servicios',
  templateUrl: './listado-servicios.component.html',
  styleUrls: ['./listado-servicios.component.scss'],
})
export class ListadoServiciosComponent {
  Servicios: any[] = [];
  cuentas: any[] = [];
  filteredServicios: any[] = [];
  searchTerm: string = '';
  esAdmin: boolean = false;
  loading: boolean = false;
  admins: any[] = [];

  OrderType = {
    Patente: 'patente',
    Precio: 'precio',
  };

  orderType: string = this.OrderType.Patente;
  constructor(
    private firebase: FirebaseService,
    private confirmationService: ConfirmationService,
    private modalService: MdbModalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    await this.verificar();
    await this.initializeData();
    await this.subscribeToConfirmationEvents();
    this.sortServicios();
    this.loading = false;
  }

  private async initializeData(): Promise<void> {
    await this.loadServicios();
  }

  private async reloasdData(): Promise<void> {
    this.loading = true;
    await this.loadServicios();
    this.sortServicios();
    this.loading = false;
  }

  private async loadServicios(): Promise<void> {
    this.Servicios = await this.firebase.obtener('servicios');
    this.filteredServicios = this.Servicios;
  }
  private async subscribeToConfirmationEvents(): Promise<void> {
    this.confirmationService.getConfirmationState().subscribe(async (state) => {
      if (state) {
        await this.reloasdData();
      }
    });
    this.confirmationService.getDeleteSEvent().subscribe(async () => {
      await this.reloasdData();
    });
    this.confirmationService.getmodifyServicioEvent().subscribe(async () => {
      await this.reloasdData();
    });
  }
  async verificar() {
    this.admins = await this.firebase.obtener('admins');
    let user = localStorage.getItem('logueado');
    this.esAdmin = this.admins.some((admin) => admin.data.id === user);
  }
  search() {
    if (this.searchTerm) {
      this.filteredServicios = this.filteredServicios.filter((auto) =>
        Object.values(auto.data).some(
          (value) =>
            value &&
            value
              .toString()
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
        )
      );
    } else {
      this.filteredServicios = this.Servicios;
    }
  }

  sortServicios() {
    const orderFunctions = {
      [this.OrderType.Patente]: (a: any, b: any) =>
        a.data.patente && b.data.patente
          ? a.data.patente.localeCompare(b.data.patente)
          : 0,
      [this.OrderType.Precio]: (a: any, b: any) =>
        a.data.precio - b.data.precio,
    };

    this.filteredServicios.sort(
      orderFunctions[this.orderType] ||
        ((a: any, b: any) => a.data.cliente.localeCompare(b.data.cliente))
    );
  }

  modificar(servicio: any) {
    this.confirmationService.setConfirmationState(false);
    const modalRef = this.modalService.open(ModifyServicioComponent, {
      data: { servicio },
    });
  }

  borrar(servicio: any) {
    this.confirmationService.setConfirmationState(false);
    const modalRef = this.modalService.open(DeleteServicioComponent, {
      data: { servicio },
    });
  }
}
