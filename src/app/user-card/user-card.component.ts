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

  @Input() user: User | null=null; 
  @Input() loadUsers: any;
  selectedUser: User | null = null;  



  @Output() updateUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<number>();

    // Variable para controlar si el modal está visible
    showDeleteConfirmation = false;

  // Método para actualizar el usuario
  onUpdateUser() {
    if (this.user) {
      this.updateUser.emit(this.user); 
    }
  }

  // Método para mostrar el modal de confirmación
  onDeleteUser() {
    console.log('Usuario a eliminar:', this.user); 
    this.selectedUser = this.user;
    this.showDeleteConfirmation = true;
  }

 // Método para manejar la confirmación de eliminación
 onConfirmDelete(isConfirmed: boolean) {
  if (isConfirmed && this.selectedUser) {
    this.userService.deleteUser(this.selectedUser.id).subscribe(
      (response) => {
        console.log('Usuario eliminado:', response);
        this.loadUsers();  
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
        alert('No se pudo eliminar el usuario.');
      }
    );
  }
  this.showDeleteConfirmation = false;
  this.selectedUser = null;
}
}
