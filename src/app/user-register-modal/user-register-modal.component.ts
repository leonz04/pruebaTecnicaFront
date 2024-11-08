import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../models/user.model'; // Asegúrate de que el modelo esté correctamente importado
import { VariableBinding } from '@angular/compiler';
import { UserService } from '../services/user-service.service'; // Asegúrate de que la ruta sea correcta



@Component({
  selector: 'app-user-register-modal',
  templateUrl: './user-register-modal.component.html',
  styleUrls: ['./user-register-modal.component.css'],
  providers: [] // Agregar DatePipe a los proveedores si lo usas en el componente

})
export class UserRegisterModalComponent {


  @Output() closeModal = new EventEmitter(); // Evento para cerrar el modal

  @Input() showModal: boolean = false; // Recibe el valor desde el componente padre
  @Input() loadUsers: any;
  
  constructor(private userService: UserService) {}


  // Variables para los campos del formulario
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  secondLastName: string = '';
  country: string = '';
  identificationType: string = '';
  identificationNumber: string = '';
  hireDate: string='';
  area: string = '';
  status: string = '';

  


  // Método para registrar el nuevo usuario
  onRegister() {
    let format = new Date(this.hireDate).toLocaleDateString('en-CA');
    console.log(format);

      
    
  
    const newUser: User = {
      hire_date: format,
      id: 0, // Si el backend gestiona el ID, lo puedes omitir o dejar como 0
      first_name: this.firstName,
      middle_name: this.middleName,
      last_name: this.lastName,
      second_last_name: this.secondLastName,
      country: this.country,
      identification_type: this.identificationType,
      identification_number: this.identificationNumber,
      area: this.area,
      status: 'Activo',
    };
  
    // Llamar al servicio para registrar el usuario
    this.userService.registerUser(newUser).subscribe(
      (response) => {
        console.log('Usuario registrado correctamente:', response);
  
        // Resetear el formulario después de registrar al usuario
        this.resetForm();
  
        // Cerrar el modal
        this.showModal = false;

        this.loadUsers();

      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
      }
    );
  }
  
  // Método para resetear los campos del formulario
  resetForm() {
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.secondLastName = '';
    this.country = '';
    this.identificationType = '';
    this.identificationNumber = '';
    this.hireDate = '';
    this.area = '';
    this.status = '';
  }
}  