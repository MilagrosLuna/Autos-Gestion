import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicesAndUtils/firebase.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConfirmationService } from 'src/app/servicesAndUtils/confirmation.service';
import { ModifyComponent } from '../modals/modify/modify.component';
import { DeleteComponent } from '../modals/delete/delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  entities: any[] = [];
  filteredEntities: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  @Input() entityType: string = 'defaultType';

  constructor(
    protected firebase: FirebaseService,
    protected confirmationService: ConfirmationService,
    protected modalService: MdbModalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    await this.initializeData();
    await this.subscribeToConfirmationEvents();
    this.loading = false;
  }

  private async initializeData(): Promise<void> {
    this.entities = await this.firebase.obtener(this.entityType);
    this.filteredEntities = this.entities;
  }

  private async subscribeToConfirmationEvents(): Promise<void> {
    this.confirmationService.getConfirmationState().subscribe(async (state) => {
      if (state) {
        await this.reloadData();
      }
    });

    this.confirmationService.getModifyEvent().subscribe(async () => {
      await this.reloadData();
    });

    this.confirmationService.getDeleteEvent().subscribe(async () => {
      await this.reloadData();
    });
  }

  private async reloadData(): Promise<void> {
    this.loading = true;
    this.entities = await this.firebase.obtener(this.entityType);
    this.filteredEntities = this.entities;
    this.loading = false;
  }



  search() {
    if (this.searchTerm) {
      this.filteredEntities = [...this.entities].filter((entity) =>
        Object.values(entity.data).some((value:any) =>
          value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    } else {
      this.filteredEntities = [...this.entities];
    }
  }

  trackById(index:any, item:any) {
    return item.id;
  }

  modificar(entity: any) {
    const modalRef = this.modalService.open(ModifyComponent, {
      data: {
        entity: entity,
        entityType: this.entityType,
      },
    });
  }

  borrar(entity: any) {
    const modalRef = this.modalService.open(DeleteComponent, {
      data: {
        entity: entity,
        entityType: this.entityType,
      },
    });
  }
}
