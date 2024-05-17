import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServicioComponent } from './delete-servicio.component';

describe('DeleteServicioComponent', () => {
  let component: DeleteServicioComponent;
  let fixture: ComponentFixture<DeleteServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteServicioComponent]
    });
    fixture = TestBed.createComponent(DeleteServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
