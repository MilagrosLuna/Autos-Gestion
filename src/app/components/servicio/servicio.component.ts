import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/servicesAndUtils/alerts.service';
import { Servicio } from 'src/app/classes/servicio';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
})
export class ServicioComponent {
  form!: FormGroup;
  cuentas: any[] = [];
  mostrarCampoNuevaCuenta: boolean = false;
  url!: File;
  constructor(
    private firebase: FirebaseService,
    private alerts: AlertsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      patente: new FormControl('', [Validators.required]),
      detalle: new FormControl('', [Validators.required]),
      fecha: new FormControl(this.getCurrentDate(), [Validators.required]),
      tallerMecanico: new FormControl('', [Validators.required]),
      precio: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
        Validators.min(0),
      ]),
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.cargar();
      } catch (error: any) {
        this.alerts.showErrorMessage(error);
      }
    } else {
      this.alerts.showErrorMessage('Error complete todos los datos!');
    }
  }

  async cargar() {
    let servicio = new Servicio();

    servicio.patente = this.form.value.patente.toUpperCase();
    servicio.detalle = this.form.value.detalle;
    servicio.tallerMecanico = this.form.value.tallerMecanico;
    servicio.precio = this.form.value.precio;
    servicio.fecha = this.form.value.fecha;

    let servicioObj = JSON.parse(JSON.stringify(servicio));

    let id = await this.firebase.guardar(servicioObj, 'servicios');

    this.form.reset({});
    this.alerts.showSuccessMessage('', 'Servicio cargado');
  }
}
