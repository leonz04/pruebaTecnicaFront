import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../models/user.model'; // Asegúrate de que el modelo esté correctamente importado
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-register-modal',
  templateUrl: './user-register-modal.component.html',
  styleUrls: ['./user-register-modal.component.css'],
  providers: [DatePipe] // Agregar DatePipe a los proveedores si lo usas en el componente

})
export class UserRegisterModalComponent {

    constructor(private datePipe: DatePipe) {}




  @Input() showModal: boolean = false; // Recibe el valor desde el componente padre
  @Output() registerUser = new EventEmitter<User>();
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  // Variables para los campos del formulario
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  secondLastName: string = '';
  country: string = '';
  identificationType: string = '';
  identificationNumber: string = '';
  hireDate: Date = new Date(); // Inicializa con la fecha actual
  area: string = '';
  status: string = '';



  // Método para registrar el nuevo usuario
  onRegister() {
    const formattedHireDate = this.datePipe.transform(this?.hireDate, 'yyyy-MM-dd');

    
    const newUser: User = {
      hire_date: formattedHireDate ||new Date(), // Formatea correctamente la fecha
      id: 0, // Aquí puedes gestionar el ID según lo que haga tu backend
      first_name: this.firstName,
      middle_name: this.middleName,
      last_name: this.lastName,
      second_last_name: this.secondLastName,
      country: this.country,
      identification_type: this.identificationType,
      identification_number: this.identificationNumber,
      area: this.area,
      status: this.status,
    };

    // Emitir el evento con el nuevo usuario
    this.registerUser.emit(newUser);

    // Limpiar los campos del formulario después del registro
    this.resetForm();
  }

  // Resetear el formulario
  resetForm() {
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.secondLastName = '';
    this.country = '';
    this.identificationType = '';
    this.identificationNumber = '';
    this.hireDate = new Date(); // Resetea la fecha de contratación
    this.area = '';
    this.status = '';
  }
}
