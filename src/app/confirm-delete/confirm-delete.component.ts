import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  @Input() userName: string | undefined;  // Recibimos el nombre del usuario
  @Output() confirmDelete = new EventEmitter<boolean>();  // Evento para confirmar la eliminación

  // Método para confirmar la eliminación
  onConfirmDelete() {
    this.confirmDelete.emit(true);  // Emitir true para confirmar
  }

  // Método para cancelar la eliminación
  onCancelDelete() {
    this.confirmDelete.emit(false);  // Emitir false para cancelar
  }
}
