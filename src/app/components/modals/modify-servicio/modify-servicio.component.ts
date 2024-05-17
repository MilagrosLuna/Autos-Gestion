import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/servicesAndUtils/confirmation.service';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';

@Component({
  selector: 'app-modify-servicio',
  templateUrl: './modify-servicio.component.html',
  styleUrls: ['./modify-servicio.component.scss']
})
export class ModifyServicioComponent {
  @Input() servicio: any;
  servicioCopy: any;
  originalservicio: any;
  constructor(
    public modalRef: MdbModalRef<ModifyServicioComponent>,
    private confirmationService: ConfirmationService,
    private firebase: FirebaseService
  ) {}

  async ngOnInit(): Promise<void> {
    this.originalservicio = JSON.parse(JSON.stringify(this.servicio));
    this.servicioCopy = JSON.parse(JSON.stringify(this.servicio));
  }

  checkValue(field: string) {
    if (this.servicioCopy.data[field] < 0) {
      this.servicioCopy.data[field] = 0;
    }
  }

  async confirmar() {
    this.servicio = { ...this.servicioCopy };
    this.servicio.data.patente = this.servicio.data.patente.toUpperCase();

    await this.firebase.modificar(this.servicio, 'servicios');

    this.confirmationService.emitModifyservicioEvent();
    this.confirmationService.setConfirmationState(true);
    this.modalRef.close();
  }

  cancelar() {
    this.confirmationService.setConfirmationState(false);

    this.servicioCopy = JSON.parse(JSON.stringify(this.originalservicio));
    this.modalRef.close();
  }
}
