import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';
// import { MdbModalService } from 'mdb-angular-ui-kit/modal';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import { Auto } from 'src/app/classes/auto';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent {
  Autos: any[] = [];
  cuentas: any[] = [];
  filteredAutos: any[] = [];
  searchTerm: string = '';
  esAdmin: boolean = false;
  loading: boolean = false;
  admins: any[] = [];
  OrderType = {
    Patente: 'patente',
    Titular: 'titular',
    Aseguradora: 'aseguradora',
    Kilometraje: 'kilometraje',
    Multas: 'multas',
  };

  orderType: string = this.OrderType.Patente;
  constructor(
    private firebase: FirebaseService // private modalService: MdbModalService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    await this.verificar();
    await this.initializeData();
    // await this.subscribeToConfirmationEvents();
    this.sortAutos();
    this.loading = false;
  }

  private async initializeData(): Promise<void> {
    await this.loadAutos();
  }

  private async reloasdData(): Promise<void> {
    this.loading = true;
    await this.loadAutos();
    this.sortAutos();
    this.loading = false;
  }

  private async loadAutos(): Promise<void> {
    this.Autos = await this.firebase.obtener('autos');
    this.filteredAutos = this.Autos;
  }

  // private async subscribeToConfirmationEvents(): Promise<void> {
  //   this.confirmationService.getConfirmationState().subscribe(async (state) => {
  //     if (state) {
  //       await this.reloasdData();
  //     }
  //   });

  //   this.confirmationService.getDeleteEvent().subscribe(async () => {
  //     await this.reloasdData();
  //   });

  // }

  async verificar() {
    this.admins = await this.firebase.obtener('admins');
    let user = localStorage.getItem('logueado');
    this.esAdmin = this.admins.some((admin) => admin.data.id === user);
  }
  search() {
    if (this.searchTerm) {
      this.filteredAutos = this.filteredAutos.filter((auto) =>
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
      this.filteredAutos = this.Autos;
    }
  }

  sortAutos() {
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
      [this.OrderType.Kilometraje]: (a: any, b: any) =>
        a.data.kilometraje - b.data.kilometraje,
      [this.OrderType.Multas]: (a: any, b: any) =>
        a.data.multas - b.data.multas,
    };

    this.filteredAutos.sort(
      orderFunctions[this.orderType] ||
        ((a: any, b: any) => a.data.cliente.localeCompare(b.data.cliente))
    );
  }

  // async createPDF(auto: any) {
  //   let autoCopy = JSON.parse(JSON.stringify(auto));
  //   let now = new Date();
  //   let fechaEmision = `${now.getDate()}/${
  //     now.getMonth() + 1
  //   }/${now.getFullYear()} a las ${now.getHours()}:${now.getMinutes()} hs`;
  //   if (!autoCopy.data.numero) {
  //     autoCopy.data.numero = 0;
  //   }
  //   if (!autoCopy.data.comentario || autoCopy.data.comentario==='') {
  //     autoCopy.data.comentario = '---';
  //   }
  //   let pdfDefinition: any = {
  //     content: [
  //       {
  //         text: `Orden de impresión auto N°: ${autoCopy.data.numero}`,
  //         fontSize: 20,
  //         margin: [0, 5, 0, 0],
  //       },
  //       {
  //         text: `Fecha de emisión: ${fechaEmision}`,
  //         fontSize: 16,
  //         margin: [0, 5, 0, 0],
  //       },
  //       {
  //         text: `-------------------------------------------------------------------------------------------------------------------`,
  //         fontSize: 16,
  //         margin: [0, 10, 0, 0],
  //       },
  //       {
  //         text: `Cliente: ${autoCopy.data.cliente} `,
  //         fontSize: 16,
  //         margin: [0, 8, 0, 0],
  //       },
  //       {
  //         text: `Trabajo: ${autoCopy.data.trabajo}, ${autoCopy.data.detalle} `,
  //         fontSize: 16,
  //         margin: [0, 8, 0, 0],
  //       },
  //       {
  //         text: `Fecha: ${autoCopy.data.fecha}
  //         Fecha de Entrega: ${autoCopy.data.fechaEntrega} `,
  //         fontSize: 16,
  //         margin: [0, 8, 0, 0],
  //       },
  //       {
  //         text: `Precio: $${autoCopy.data.precio}
  //         Seña: $${autoCopy.data.sena} `,
  //         fontSize: 16,
  //         margin: [0, 8, 0, 0],
  //       },
  //       {
  //         text: `Comentarios:  ${autoCopy.data.comentario} `,
  //         fontSize: 16,
  //         margin: [0, 5, 0, 0],
  //       },
  //     ],
  //   };

  //   const pdf = pdfMake.createPdf(pdfDefinition);
  //   //pdf.download(`auto_${auto.data.numero}`);
  //   pdf.open();
  // }
}
