import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonajeService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  updatePersonaje(id: number, updatedData: any): Observable<any> {
    return this.http.put(`https://rickandmortyapi.com/api/character{id}`, updatedData);

  }
}
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-personaje-edit-dialog',
  template: `
   
      <!-- Agrega más campos según sea necesario -->
      <div class="dialog-buttons">
        <button mat-button (click)="save()">Guardar</button>
        <button mat-button (click)="cancel()">Cancelar</button>
      </div>
  `,
  styles: [
    `
      .dialog-buttons {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class PersonajeEditDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PersonajeEditDialogComponent>
  ) {}

  save(): void {
    this.dialogRef.close(this.data);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
  
}
