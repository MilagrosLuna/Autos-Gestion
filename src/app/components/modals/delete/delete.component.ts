import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/servicesAndUtils/confirmation.service';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  @Input() entity: any;
  @Input() entityType: string = 'defaultType';

  constructor(
    public modalRef: MdbModalRef<DeleteComponent>,
    private confirmationService: ConfirmationService,
    private firebase: FirebaseService
  ) {
    this.entityType = this.entityType || 'defaultType';
  }
  async confirmar() {
    const archiveCollection = this.entityType + 'Archivo';
    await this.firebase.guardar(this.entity, archiveCollection);
    await this.firebase.borrar(this.entity, this.entityType);

    this.confirmationService.emitDeleteEvent();
    this.confirmationService.setConfirmationState(true);
    this.modalRef.close();
  }

  cancelar() {
    this.confirmationService.setConfirmationState(false);
    this.modalRef.close();
  }
}
