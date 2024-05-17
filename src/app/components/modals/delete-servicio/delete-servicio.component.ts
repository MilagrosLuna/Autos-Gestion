import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/servicesAndUtils/confirmation.service';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';

@Component({
  selector: 'app-delete-servicio',
  templateUrl: './delete-servicio.component.html',
  styleUrls: ['./delete-servicio.component.scss'],
})
export class DeleteServicioComponent {
  @Input() servicio: any;

  constructor(
    public modalRef: MdbModalRef<DeleteServicioComponent>,
    private confirmationService: ConfirmationService,
    private firebase: FirebaseService
  ) {}

  async confirmar() {
    await this.firebase.guardar(this.servicio, 'serviciosArchivo');
    await this.firebase.borrar(this.servicio, 'servicios');

    this.confirmationService.emitDeleteSEvent();
    this.confirmationService.setConfirmationState(true);
    this.modalRef.close();
  }

  cancelar() {
    this.confirmationService.setConfirmationState(false);
    this.modalRef.close();
  }
}
