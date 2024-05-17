import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAutoComponent } from './modify-auto.component';

describe('ModifyAutoComponent', () => {
  let component: ModifyAutoComponent;
  let fixture: ComponentFixture<ModifyAutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyAutoComponent]
    });
    fixture = TestBed.createComponent(ModifyAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
