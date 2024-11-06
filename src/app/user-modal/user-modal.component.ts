import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
  @Input() user: any; // Recibe el objeto usuario
  @Output() closeModal = new EventEmitter<void>(); // Emite un evento para cerrar el modal
  @Output() updateUser = new EventEmitter<any>(); // Emite el usuario actualizado

  updatedUser: any = {}; // Copia del usuario para editar

  ngOnChanges() {
    // Si se reciben cambios en el usuario, crear una copia editable
    if (this.user) {
      this.updatedUser = { ...this.user };
    }
  }

  // Método para cerrar el modal
  onClose() {
    this.closeModal.emit();
  }

  // Método para actualizar el usuario
  onUpdateUser() {
    this.updateUser.emit(this.updatedUser);
  }
}
