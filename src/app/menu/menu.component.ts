//agrega que se pueda ver la informacion del usuario, incluyendo imagen
// tambien los botones agregar y actualizar en la tabla

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { Personaje } from '../modals/personaje.model';

import { PersonajeEditDialogComponent } from '../components/personaje-edit/personaje-edit-dialog.component';
import { PersonajeService } from '../services/personaje.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  
  providers: [PersonajeService],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @ViewChild('detallesPersonaje') detallesPersonaje!: TemplateRef<any>;
  @ViewChild('detallesUsuario') detallesUsuario!: TemplateRef<any>;
  

  selectedComponent: string | null = null;
  characters: Personaje[] = [];
  displayedColumns: string[] = ['id', 'imagen', 'nombre', 'acciones'];
  dataSource = this.characters;

  userInfo: any;


  constructor(
    private personajeService: PersonajeService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {}

  //metodo para mostrar el componente, aqui el comoponente hace funcion a tablas
  mostrarComponente(component: string) {
    this.selectedComponent = component;
    if (component === 'tablas') {
      this.cargarPersonajes();
    }
  }

  //metodo caragar personajes, se carga la api
  cargarPersonajes() {
    this.http.get('https://rickandmortyapi.com/api/character').subscribe((data: any) => {
      this.characters = data.results;
      this.dataSource = this.characters;
    });
  }

  //preguntar si quiere eliminar
  //borramos personaje
  borrarPersonaje(id: number) {
    this.characters = this.characters.filter(character => character.id !== id);
    this.dataSource = this.characters;
  }

  //ver detalles del personaje  
  verDetallesPersonaje(id: number) {
    const apiUrl = `https://rickandmortyapi.com/api/character/${id}`;
    this.http.get<Personaje>(apiUrl).subscribe( //toma los datos del personajee.module.ts
      (data: Personaje) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = data;
        this.dialog.open(this.detallesPersonaje, dialogConfig);
      }
    );
  }
  
  editCharacter(character: any): void {
    const dialogRef = this.dialog.open(PersonajeEditDialogComponent, {
      width: '400px',
      data: { ...character }, // Pasar datos actuales al diálogo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Actualizar los datos del personaje en la lista
        const index = this.characters.findIndex((c) => c.id === character.id);
        if (index !== -1) {
          this.characters[index] = { ...this.characters[index], ...result };
        }
      }
    });
  }

  //cerrar sesion, lo redirecciona al login
  cerrarSesion() {
    this.router.navigate(['/log']);
  }

  agregar(){

  }

  actualizar(){

  }

}
