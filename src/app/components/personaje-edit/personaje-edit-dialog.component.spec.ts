import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajeEditDialogComponent } from './personaje-edit-dialog.component';

describe('PersonajeEditComponent', () => {
  let component: PersonajeEditDialogComponent;
  let fixture: ComponentFixture<PersonajeEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonajeEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonajeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});