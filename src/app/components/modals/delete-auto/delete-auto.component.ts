import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/servicesAndUtils/confirmation.service';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';

@Component({
  selector: 'app-delete-auto',
  templateUrl: './delete-auto.component.html',
  styleUrls: ['./delete-auto.component.scss'],
})
export class DeleteAutoComponent {
  @Input() auto: any;

  constructor(
    public modalRef: MdbModalRef<DeleteAutoComponent>,
    private confirmationService: ConfirmationService,
    private firebase: FirebaseService
  ) {}

  async confirmar() {
    await this.firebase.guardar(this.auto, 'autosArchivo');
    await this.firebase.borrar(this.auto, 'autos');

    this.confirmationService.emitDeleteEvent();
    this.confirmationService.setConfirmationState(true);
    this.modalRef.close();
  }

  cancelar() {
    this.confirmationService.setConfirmationState(false);
    this.modalRef.close();
  }
}
