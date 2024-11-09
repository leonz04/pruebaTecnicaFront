import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  pagedUsers: User[] = [];
  pageSize: number = 10; // Por defecto, 10 usuarios por página
  pageIndex: number = 0;
  totalUsers: number = 0;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  showModal = false;
  selectedUser: User | null = null;
  showRegisterModal = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  


  constructor(private userService: UserService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Método para cargar los usuarios
  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.filteredUsers = data;  // Inicializar con todos los usuarios
      this.totalUsers = data.length;
      this.calculateTotalPages(); // Calculamos las páginas totales
      this.updatePagedUsers();
    });
  }

  // Método para calcular las páginas totales
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, index) => index);
  }

  // Método para actualizar los usuarios que se muestran en la página actual
  updatePagedUsers(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  // Evento que se activa cuando se cambia de página en el paginador
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedUsers();
  }

  // Cambiar el número de usuarios por página
  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = parseInt(target.value, 10); // Asegúrate de convertir el valor a un número
    this.pageIndex = 0; // Reiniciar la página a la primera
    this.calculateTotalPages(); // Recalcular las páginas
    this.updatePagedUsers();
  }

  // Cambiar a una página específica
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageIndex = page;
      this.updatePagedUsers();
    }
  }

  // Manejar la actualización de un usuario
  handleUpdate(user: User): void {
    this.selectedUser = user;
    this.showModal = true;
  }

  // Cerrar el modal de actualización
  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  // Actualizar usuario mediante el modal
  updateUser(user: User): void {
    this.userService.updateUser(user.id, user).subscribe(
      () => {
        this.toastr.success('Registro Actualizado con éxito', 'Éxito', {
          positionClass: 'toast-top-right',
          timeOut: 3000,
          progressBar: true,
        });

        this.loadUsers(); // Recargar la lista después de actualizar
        this.closeModal();
      },
      (error) => {
        this.toastr.error('La respuesta del servidor es inválida o no se recibió respuesta.', 'Error', {
          positionClass: 'toast-top-right', 
          timeOut: 3000, 
          progressBar: true, 
        });
        console.error('Error al actualizar el usuario', error);
      }
    );
  }

  // Abrir el modal de registro de usuario
  openRegisterModal(): void {
    this.showRegisterModal = true;
  }

  // Cerrar el modal de registro
  closeRegisterModal(): void {
    this.showRegisterModal = false;
  }

  // Filtrar usuarios según los filtros aplicados en `app-user-filter`
  onFilterChanged(filters: any): void {
    if (Object.keys(filters).length === 0) {
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
          (filters.status ? user.status.toLowerCase().includes(filters.status.toLowerCase()) : true)
        );
      });
    }
    this.calculateTotalPages(); // Recalcular las páginas cuando se aplique un filtro
    this.updatePagedUsers(); // Actualizar la paginación según los resultados filtrados
  }
}
