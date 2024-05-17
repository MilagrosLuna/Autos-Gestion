import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyServicioComponent } from './modify-servicio.component';

describe('ModifyServicioComponent', () => {
  let component: ModifyServicioComponent;
  let fixture: ComponentFixture<ModifyServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyServicioComponent]
    });
    fixture = TestBed.createComponent(ModifyServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
