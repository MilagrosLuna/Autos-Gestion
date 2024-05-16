import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/servicesAndUtils/alerts.service';
import { Auto } from 'src/app/classes/auto';
@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent {
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
      titular: new FormControl('', [Validators.required]),
      aseguradora: new FormControl('', [Validators.required]),
      kilometraje: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
        Validators.min(0),
      ]),
      multas: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
        Validators.min(0),
      ]),
    });
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
    let auto = new Auto();

    auto.patente = this.form.value.patente;
    auto.titular = this.form.value.titular;
    auto.aseguradora = this.form.value.aseguradora;
    auto.kilometraje = this.form.value.kilometraje;
    auto.multas = this.form.value.multas;

    // const contadorSnap = await this.firebase.obtenrUno('contadores', 'laburos');
    // let contador = contadorSnap?.data['contador'];
    // contador++;
    // await this.firebase.modificar(
    //   { id: 'laburos', data: { contador: contador } },
    //   'contadores'
    // );
    // auto.numero = contador;

    let autoObj = JSON.parse(JSON.stringify(auto));

    let id = await this.firebase.guardar(autoObj, 'autos');

    this.form.reset({});
    this.alerts.showSuccessMessage('', 'Auto cargado');
  }
}
