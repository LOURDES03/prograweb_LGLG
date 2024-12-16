import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa este módulo
import { MatInputModule } from '@angular/material/input'; // También importa MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Para los botones

@Component({
  selector: 'app-personaje-edit-dialog',
  template: `
    <h2 mat-dialog-title>Editar Personaje</h2>
    <mat-dialog-content>
      <form [formGroup]="editForm">
        <!-- Nombre del Personaje -->
        <mat-form-field appearance="fill">
          <mat-label>Nombre del Personaje</mat-label>
          <input matInput formControlName="name" />
          <mat-error *ngIf="editForm.get('name')?.hasError('required')">
            El nombre es obligatorio.
          </mat-error>
        </mat-form-field>

        <!-- Edad del Personaje -->
        <mat-form-field appearance="fill">
          <mat-label>Edad</mat-label>
          <input matInput type="number" formControlName="age" />
          <mat-error *ngIf="editForm.get('age')?.hasError('required')">
            La edad es obligatoria.
          </mat-error>
          <mat-error *ngIf="editForm.get('age')?.hasError('min')">
            La edad debe ser mayor o igual a 0.
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancelar</button>
      <button mat-button color="primary" (click)="save()">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
        margin-bottom: 16px;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule, // Campo de formulario
    MatInputModule, // Entradas
    MatButtonModule, // Botones
  ],
})
export class PersonajeEditDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonajeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Crear el formulario con datos existentes
    this.editForm = this.fb.group({
      name: [data.name, Validators.required], // Nombre del personaje
      age: [data.age, [Validators.required, Validators.min(0)]], // Edad con validación mínima
    });
  }

  save(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value); // Retorna los datos actualizados
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Cierra el diálogo sin guardar cambios
  }
}
