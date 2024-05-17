import { Component, OnDestroy } from '@angular/core';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/servicesAndUtils/alerts.service';
import { Alquiler } from 'src/app/classes/alquiler';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.scss'],
})
export class AlquilerComponent implements OnDestroy {
  form!: FormGroup;
  cuentas: any[] = [];
  mostrarCampoNuevaCuenta: boolean = false;
  url!: File;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private firebase: FirebaseService,
    private alerts: AlertsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      patente: new FormControl('', [Validators.required]),
      detalle: new FormControl('', [Validators.required]),
      chofer: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl(this.getCurrentDate(), [
        Validators.required,
      ]),
      fechaFin: new FormControl(this.getCurrentDate(), [Validators.required]),
      precioDiario: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
        Validators.min(0),
      ]),
      precioTotal: new FormControl(0, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
        Validators.min(0),
      ]),
    });
    this.form
      .get('fechaInicio')!
      .valueChanges.pipe(debounceTime(500), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.calculateTotalPrice();
      });
    this.form
      .get('fechaFin')!
      .valueChanges.pipe(debounceTime(500), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.calculateTotalPrice();
      });

    this.form
      .get('precioDiario')!
      .valueChanges.pipe(debounceTime(500), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.calculateTotalPrice();
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  getCurrentDate(): string {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
  }

  calculateTotalPrice(): void {
    const startDate = new Date(this.form.value.fechaInicio);
    const endDate = new Date(this.form.value.fechaFin);
    // Asegúrate de que la fecha de fin sea al menos el mismo día que la fecha de inicio
    if (endDate < startDate) {
      endDate.setDate(startDate.getDate());
    }
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    // Calcula la diferencia en días y agrega 1 para incluir el día de inicio
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const precioDiario = parseFloat(this.form.value.precioDiario) || 0;
    const totalPrice = precioDiario * diffDays;

    this.form.patchValue({ precioTotal: totalPrice });

    console.log(
      `Días: ${diffDays}, Precio Diario: ${precioDiario}, Precio Total: ${totalPrice}`
    );
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
    let alquiler = new Alquiler();

    alquiler.patente = this.form.value.patente.toUpperCase();
    alquiler.detalle = this.form.value.detalle;
    alquiler.chofer = this.form.value.chofer;
    alquiler.precioDiario = this.form.value.precioDiario;
    alquiler.precioTotal = this.form.value.precioTotal;
    alquiler.fechaInicio = this.form.value.fechaInicio;
    alquiler.fechaFin = this.form.value.fechaFin;

    let alquilerObj = JSON.parse(JSON.stringify(alquiler));

    let id = await this.firebase.guardar(alquilerObj, 'alquileres');

    this.form.reset({
      fechaInicio: this.getCurrentDate(),
      fechaFin: this.getCurrentDate(),
    });
    this.alerts.showSuccessMessage('', 'alquiler cargado');
  }
}
