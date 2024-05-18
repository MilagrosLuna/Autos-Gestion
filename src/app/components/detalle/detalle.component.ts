import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';
import { Detalle } from 'src/app/classes/detalle';
import { Alquiler } from 'src/app/classes/alquiler';
import { Servicio } from 'src/app/classes/servicio';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  detallesPorPatente: any[] = [];
  loading: boolean = false;
  constructor(private firebase: FirebaseService) {}

  async ngOnInit() {
    this.loading = true;
    await this.cargarDetalles();
    this.loading = false;
  }

  private async cargarDetalles() {
    try {
      const servicios = await this.firebase.obtener('servicios');
      const alquileres = await this.firebase.obtener('alquileres');
      const autos = await this.firebase.obtener('autos');
      this.detallesPorPatente = this.procesarDetalles(
        servicios,
        alquileres,
        autos
      );
    } catch (error) {
      console.error('Error al cargar los detalles:', error);
      this.loading = false;
    }
  }

  private procesarDetalles(
    servicios: any[],
    alquileres: any[],
    autos: any[]
  ): any[] {
    let detalles: {
      [patente: string]: Detalle & {
        auto: any;
        alquileres: Alquiler[];
        servicios: Servicio[];
      };
    } = {};
  
    // Inicializar detalles por patente
    autos.forEach((auto: any) => {
      const patente = auto.data.patente;
      detalles[patente] = {
        alquileresTotal: 0,
        serviciosTotal: 0,
        balance: 0,
        auto: auto.data,
        alquileres: [],
        servicios: [],
      };
    });
  
    // Sumar alquileres
    alquileres.forEach((alquiler: any) => {
      const patente = alquiler.data.patente;
      if (detalles[patente]) {
        detalles[patente].alquileresTotal += alquiler.data.precioTotal;
        detalles[patente].alquileres.push(alquiler.data);
      }
    });
  
    // Sumar servicios
    servicios.forEach((servicio: any) => {
      const patente = servicio.data.patente;
      if (detalles[patente]) {
        detalles[patente].serviciosTotal += servicio.data.precio;
        detalles[patente].servicios.push(servicio.data);
      }
    });
  
    // Calcular balance para cada patente
    Object.keys(detalles).forEach(patente => {
      detalles[patente].balance = detalles[patente].alquileresTotal - detalles[patente].serviciosTotal;
    });
  
    return Object.values(detalles);
  }
  
  // private procesarDetalles(
  //   servicios: any[],
  //   alquileres: any[],
  //   autos: any[]
  // ): any[] {
  //   let detalles: {
  //     [patente: string]: Detalle & {
  //       auto: any;
  //       alquileres: Alquiler[];
  //       servicios: Servicio[];
  //     };
  //   } = {};

  //   autos.forEach((auto: any) => {
  //     const patente = auto.data.patente;
  //     detalles[patente] = {
  //       alquileresTotal: 0,
  //       serviciosTotal: 0,
  //       balance: 0,
  //       auto: auto.data,
  //       alquileres: [],
  //       servicios: [],
  //     };
  //   });

  //   alquileres.forEach((alquiler: any) => {
  //     const patente = alquiler.data.patente;
  //     if (detalles[patente]) {
  //       detalles[patente].alquileresTotal += alquiler.data.precioTotal;
  //       detalles[patente].alquileres.push(alquiler.data);
  //     }
  //   });

  //   servicios.forEach((servicio: any) => {
  //     const patente = servicio.data.patente;
  //     if (detalles[patente]) {
  //       detalles[patente].serviciosTotal += servicio.data.precio;
  //       detalles[patente].servicios.push(servicio.data);
  //       detalles[patente].balance =
  //         detalles[patente].alquileresTotal - detalles[patente].serviciosTotal;
  //     }
  //   });

  //   Object.keys(detalles).forEach(patente => {
  //     detalles[patente].balance = detalles[patente].alquileresTotal - detalles[patente].serviciosTotal;
  //   });

  //   return Object.values(detalles);
  // }
}
