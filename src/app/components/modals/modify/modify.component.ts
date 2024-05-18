import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/servicesAndUtils/confirmation.service';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
})
export class ModifyComponent {
  @Input() entity: any;
  entityCopy: any;
  originalEntity: any;
  @Input() entityType: string = 'defaultType';

  constructor(
    public modalRef: MdbModalRef<ModifyComponent>,
    private confirmationService: ConfirmationService,
    private firebase: FirebaseService
  ) {
    this.entityType = this.entityType || 'defaultType';
  }

  async ngOnInit(): Promise<void> {
    this.originalEntity = JSON.parse(JSON.stringify(this.entity));
    this.entityCopy = JSON.parse(JSON.stringify(this.entity));
  }

  checkValue(field: string) {
    if (this.entityCopy.data[field] < 0) {
      this.entityCopy.data[field] = 0;
    }
  }

  async confirmar() {
    this.entity = { ...this.entityCopy };
    if (this.entity.data.patente) {
      this.entity.data.patente = this.entity.data.patente.toUpperCase();
    }

    if (this.entityType != 'defaultType') {
      await this.firebase.modificar(this.entity, this.entityType);
    }

    this.confirmationService.emitModifyEvent();
    this.confirmationService.setConfirmationState(true);
    this.modalRef.close();
  }

  cancelar() {
    this.confirmationService.setConfirmationState(false);

    this.entityCopy = JSON.parse(JSON.stringify(this.originalEntity));
    this.modalRef.close();
  }
}
