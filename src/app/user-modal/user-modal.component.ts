import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnChanges {
  @Input() user: any;  // Recibe los datos del usuario a editar
  @Output() closeModal = new EventEmitter<void>();  // Emite un evento para cerrar el modal
  @Output() updateUser = new EventEmitter<any>();  // Emite los datos del usuario actualizado

  constructor(private toastr: ToastrService) {}


  updatedUser: any = {};  // Almacena los datos del usuario que se van a actualizar
  todayDate: string = new Date().toLocaleDateString('en-CA'); // Fecha de edición en formato yyyy-mm-dd

  ngOnChanges() {
    // Si hay un usuario pasado como input, se copian los datos al formulario
    if (this.user && Object.keys(this.user).length > 0) {
      this.updatedUser = { ...this.user };  // Copia de los datos del usuario a actualizar
    } else {
      this.updatedUser = {};  // Limpia los datos si no se recibe usuario
    }
  }

  // Función para regenerar el correo cuando se modifican los nombres o apellidos
  regenerateEmail() {
    if (this.updatedUser.first_name && this.updatedUser.last_name) {
      this.updatedUser.email = `${this.updatedUser.first_name}.${this.updatedUser.last_name}@empresa.com`.toLowerCase();
    }
  }

  // Método para cerrar el modal
  onClose() {
    this.closeModal.emit();  // Emite el evento para cerrar el modal
  }

  // Método para actualizar los datos del usuario
  onUpdateUser() {
    // Asigna la fecha de edición antes de emitir los cambios
    this.updatedUser.edit_date = this.todayDate;

    // Emite los datos actualizados al componente padre
    this.updateUser.emit(this.updatedUser);
  }

   // Método para formatear la fecha de "updated_at" hasta los minutos
   formatDateToCustomFormat(date: string): string {
    const formattedDate = new Date(date);
    const day = ("0" + formattedDate.getDate()).slice(-2); // Obtiene el día con 2 dígitos
    const month = ("0" + (formattedDate.getMonth() + 1)).slice(-2); // Obtiene el mes con 2 dígitos (el mes empieza en 0)
    const year = formattedDate.getFullYear();
    const hours = ("0" + formattedDate.getHours()).slice(-2); // Obtiene las horas con 2 dígitos
    const minutes = ("0" + formattedDate.getMinutes()).slice(-2); // Obtiene los minutos con 2 dígitos
    const seconds = ("0" + formattedDate.getSeconds()).slice(-2); // Obtiene los segundos con 2 dígitos
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  // Usar este método para establecer la fecha formateada
  get formattedUpdatedAt(): string {
    return this.formatDateToCustomFormat(this.user.updated_at);
  }
}
