import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  readonly username = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);

  hide = signal(true);

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    if (this.email.valid && this.password.valid) {
      this.http.get('https://api.escuelajs.co/api/v1/users').subscribe({
        next: (response: any) => {
          // La API devuelve un arreglo directamente
          const user = response.find(
            (u: any) => u.email === this.email.value && u.password === this.password.value
          );
          if (user) {
            // Redirige al usuario si los datos coinciden
            this.router.navigate(['/user-list']);
          } else {
            // Muestra un mensaje si las credenciales no son válidas
            this.snackBar.open('Datos inválidos', 'Cerrar', { duration: 3000 });
          }
        },
        error: () => {
          // Manejo de errores HTTP
          this.snackBar.open('Error al comunicarse con la API', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      // Valida campos vacíos o mal formateados
      this.snackBar.open('Por favor complete todos los campos correctamente', 'Cerrar', { duration: 3000 });
    }
  }
  

  errorUsuario() {
    return this.username.hasError('required') ? 'Debes ingresar un nombre de usuario' : '';
  }

  errorEmail() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un email';
    }
    return this.email.hasError('email') ? 'Email no valido' : '';
  }
}

