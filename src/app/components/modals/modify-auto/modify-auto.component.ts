import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/servicesAndUtils/confirmation.service';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';

@Component({
  selector: 'app-modify-auto',
  templateUrl: './modify-auto.component.html',
  styleUrls: ['./modify-auto.component.scss'],
})
export class ModifyAutoComponent {
  @Input() auto: any;
  autoCopy: any;
  originalAuto: any;
  constructor(
    public modalRef: MdbModalRef<ModifyAutoComponent>,
    private confirmationService: ConfirmationService,
    private firebase: FirebaseService
  ) {}

  async ngOnInit(): Promise<void> {
    this.originalAuto = JSON.parse(JSON.stringify(this.auto));
    this.autoCopy = JSON.parse(JSON.stringify(this.auto));
  }

  checkValue(field: string) {
    if (this.autoCopy.data[field] < 0) {
      this.autoCopy.data[field] = 0;
    }
  }

  async confirmar() {
    this.auto = { ...this.autoCopy };
    this.auto.data.patente = this.auto.data.patente.toUpperCase();

    await this.firebase.modificar(this.auto, 'autos');

    this.confirmationService.emitModifyAutoEvent();
    this.confirmationService.setConfirmationState(true);
    this.modalRef.close();
  }

  cancelar() {
    this.confirmationService.setConfirmationState(false);

    this.autoCopy = JSON.parse(JSON.stringify(this.originalAuto));
    this.modalRef.close();
  }
}
