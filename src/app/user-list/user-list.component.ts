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
  // Obtener todos los usuarios cuando el componente se inicie
  this.userService.getUsers().subscribe((data: User[]) => {
    this.users = data;
    this.filteredUsers = data; // Inicialmente, todos los usuarios se muestran
  });  }

  // Método para obtener los usuarios del servicio
  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = data; // Reinicia el filtro al cargar usuarios
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
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
   filteredUsers: User[] = []; // Lista de usuarios filtrados


   onFilterChanged(filters: any): void {
    if (Object.keys(filters).length === 0) {
      // Si no hay filtros, mostrar todos los usuarios
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user => {
        return (
          (filters.first_name ? user.first_name.toLowerCase().includes(filters.first_name.toLowerCase()) : true) &&
          (filters.middle_name ? user.middle_name.toLowerCase().includes(filters.middle_name.toLowerCase()) : true) &&
          (filters.last_name ? user.last_name.toLowerCase().includes(filters.last_name.toLowerCase()) : true) &&
          (filters.second_last_name ? user.second_last_name.toLowerCase().includes(filters.second_last_name.toLowerCase()) : true) &&
          (filters.identification_type ? user.identification_type.toLowerCase().includes(filters.identification_type.toLowerCase()) : true) &&
          (filters.identification_number ? user.identification_number.includes(filters.identification_number) : true) &&
          (filters.country ? user.country.toLowerCase().includes(filters.country.toLowerCase()) : true) &&
          (filters.email ? user.email.toLowerCase().includes(filters.email.toLowerCase()) : true) &&
          (filters.status ? user.status.toLowerCase().includes(filters.status.toLowerCase()) : true)
        );
      });
    }
}}
