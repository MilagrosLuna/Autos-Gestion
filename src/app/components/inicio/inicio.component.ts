import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements AfterViewInit {
  @ViewChild('graficoServicioXPatente') graficoServicioXPatente!: ElementRef;
  @ViewChild('graficoGastos') graficoGastos!: ElementRef;
  servicios: any[] = [];
  alquileres: any[] = [];
  conteoServiciosPorPatente: any = {};
  totalesPorPatente: any = {};

  constructor(private router: Router, private firebase: FirebaseService) {}

  ngAfterViewInit() {
    this.cargarDatosYDibujarGraficos();
  }

  private async cargarDatosYDibujarGraficos() {
    try {
      this.servicios = await this.firebase.obtener('servicios');
      this.alquileres = await this.firebase.obtener('alquileres');
      this.procesarDatos();
      this.dibujarGraficoBarras();
      this.dibujarGraficoPastel();
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  private procesarDatos() {
    let totalesPorPatente: { [patente: string]: number } = {};
    this.alquileres.forEach((alquiler: any) => {
      const patente = alquiler.data.patente;
      const precio = alquiler.data.precioTotal;
      totalesPorPatente[patente] = (totalesPorPatente[patente] || 0) + precio;
    });

    this.servicios.forEach((servicio: any) => {
      const patente = servicio.data.patente;
      const precio = servicio.data.precio;
      totalesPorPatente[patente] = (totalesPorPatente[patente] || 0) - precio;
    });
    this.totalesPorPatente = totalesPorPatente;

    this.servicios.forEach((servicio) => {
      const patente = servicio.data.patente;
      this.conteoServiciosPorPatente[patente] =
        (this.conteoServiciosPorPatente[patente] || 0) + 1;
    });
  }
  private dibujarGraficoBarras() {
    const labelsBarras = Object.keys(this.totalesPorPatente);
    const dataBarras = Object.values(this.totalesPorPatente);

    const ctxBarras = (
      this.graficoGastos.nativeElement as HTMLCanvasElement
    ).getContext('2d');

    if (ctxBarras) {
      const barChart = new Chart(ctxBarras, {
        type: 'bar',
        data: {
          labels: labelsBarras,
          datasets: [
            {
              label: 'Balance por patente',
              data: dataBarras,
              backgroundColor: labelsBarras.map(() => this.getRandomColor()),
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error(
        'No se pudo obtener el contexto del lienzo para el gráfico de barras.'
      );
    }
  }

  private dibujarGraficoPastel() {
    const labelsPastel = Object.keys(this.conteoServiciosPorPatente);
    const dataPastel = Object.values(this.conteoServiciosPorPatente);

    const ctxPastel = (
      this.graficoServicioXPatente.nativeElement as HTMLCanvasElement
    ).getContext('2d');

    if (ctxPastel) {
      const pieChart = new Chart(ctxPastel, {
        type: 'pie',
        data: {
          labels: labelsPastel,
          datasets: [
            {
              label: 'Número de servicios por patente',
              data: dataPastel,
              backgroundColor: labelsPastel.map(() => this.getRandomColor()),
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    } else {
      console.error(
        'No se pudo obtener el contexto del lienzo para el gráfico de pastel.'
      );
    }
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  goTo(ruta: string) {
    this.router.navigate(['/' + ruta]);
  }
}
