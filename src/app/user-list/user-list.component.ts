import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null; // Usuario seleccionado para actualizar
  showModal: boolean = false; // Controla si el modal está visible

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Método para obtener los usuarios del servicio
  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }

    // Método para eliminar un usuario
    handleDelete(id: number) {
      // Mostrar una confirmación antes de eliminar
      const confirmed = confirm(`¿Estás seguro de que deseas eliminar a ${name}?`);

      if (confirmed) {
        this.userService.deleteUser(id).subscribe(
          (response) => {
            console.log('Usuario eliminado:', response);
            // Aquí puedes actualizar la lista de usuarios si es necesario
          },
          (error) => {
            console.error('Error al eliminar el usuario:', error);
          }
        );
      }
    }

  // Método para abrir el modal con el usuario seleccionado
  handleUpdate(user: any) {
    this.selectedUser = user; // Guardar el usuario seleccionado
    this.showModal = true; // Mostrar el modal
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
  }

  // Método para actualizar el usuario
  updateUser(user: any) {
    this.userService.updateUser(user.id, user).subscribe(
      (updatedUser) => {
        // Actualiza la lista de usuarios
        this.loadUsers();
        // Cierra el modal
        this.closeModal();
      },
      (error) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }

   // Método para manejar el registro de un nuevo usuario

   showRegisterModal = false; // Controla la visibilidad del modal

   // Método para abrir el modal de registro
   openRegisterModal() {
     this.showRegisterModal = true;
   }
 
   // Método para cerrar el modal de registro
   closeRegisterModal() {
     this.showRegisterModal = false;
   }
 
   // Método para manejar el registro de un nuevo usuario
   onRegisterUser(user: User) {
     console.log('Nuevo usuario registrado:', user);
     // Aquí puedes agregar la lógica para enviar el usuario al backend, etc.
     this.closeRegisterModal(); // Cierra el modal después del registro
   }
}
