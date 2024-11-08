import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnChanges {
  @Input() user: any;  // Recibe los datos del usuario a editar
  @Output() closeModal = new EventEmitter<void>();  // Emite un evento para cerrar el modal
  @Output() updateUser = new EventEmitter<any>();  // Emite los datos del usuario actualizado

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
}
