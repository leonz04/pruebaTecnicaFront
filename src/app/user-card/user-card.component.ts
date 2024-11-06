import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model'; // Importa el modelo User
import { UserService } from '../services/user-service.service';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  constructor(private userService: UserService) {}

  // Define el tipo del input para que TypeScript reconozca las propiedades de `user`
  @Input() user: User | undefined; // El tipo ahora es `User`

  @Output() updateUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<number>();

    // Variable para controlar si el modal está visible
    showDeleteConfirmation = false;

  // Método para actualizar el usuario
  onUpdateUser() {
    if (this.user) {
      this.updateUser.emit(this.user); // Emitir el usuario para ser actualizado
    }
  }

  // Método para mostrar el modal de confirmación
  onDeleteUser() {
    this.showDeleteConfirmation = true; // Mostrar el modal
  }

  // Método para manejar la confirmación de eliminación
  onConfirmDelete(isConfirmed: boolean) {
    if (isConfirmed && this.user) {
      // Si la eliminación es confirmada, emitir el evento
      this.deleteUser.emit(this.user.id);
    }
    this.showDeleteConfirmation = false; // Ocultar el modal
  }
}
