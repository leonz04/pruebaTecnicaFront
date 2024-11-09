import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../models/user.model'; // Asegúrate de que el modelo esté correctamente importado
import { UserService } from '../services/user-service.service'; // Asegúrate de que la ruta sea correcta
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-register-modal',
  templateUrl: './user-register-modal.component.html',
  styleUrls: ['./user-register-modal.component.css'],
  providers: []
})
export class UserRegisterModalComponent {

  @Output() closeModal = new EventEmitter(); // Evento para cerrar el modal
  @Input() showRegisterModal: boolean = false; // Recibe el valor desde el componente padre
  @Input() loadUsers: any;

  constructor(private userService: UserService,private toastr: ToastrService) {}

  // Variables para los campos del formulario
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  secondLastName: string = '';
  country: string = '';
  identificationType: string = '';
  identificationNumber: string = '';
  hireDate: string = '';
  area: string = '';
  status: string = '';

  // Fechas mínima y máxima para el campo de fecha
  maxDate: string = '';
  minDate: string = '';

  ngOnInit() {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // Fecha de hoy
    const pastDate = new Date(today.setDate(today.getDate() - 30)); // 30 días antes
    this.minDate = pastDate.toISOString().split('T')[0];
  }

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
        // Verificar si la respuesta es undefined
      if (response === undefined) {
        this.toastr.error('La respuesta del servidor es inválida o no se recibió respuesta.', 'Error', {
          positionClass: 'toast-top-right', 
          timeOut: 3000, 
          progressBar: true, 
        });
        this.resetForm();

        return; // Detener la ejecución si la respuesta es inválida
      }

      console.log('Usuario registrado correctamente:', response);
      this.toastr.success('Registro realizado con éxito', 'Éxito', {
        positionClass: 'toast-top-right',
        timeOut: 3000,
        progressBar: true,
      });

        // Resetear el formulario después de registrar al usuario
        this.resetForm();

        // Cerrar el modal
        this.showRegisterModal = false;

        // Cargar los usuarios nuevamente
        this.loadUsers();
      },
      (error) => {
        this.toastr.error('El registro no se realizo por favor intente de nevo verificando los valores de entrada realizado con éxito', 'Error', {
          positionClass: 'toast-top-right', // Esta opción coloca el toast en la parte superior derecha
          timeOut: 3000, // Duración del toast en milisegundos
          progressBar: true, // Mostrar barra de progreso
        });
        console.error('Error al registrar el usuario:', error);
      }
    );
    
    
    
    this.closeModal.emit(); // Emitir el evento al componente padre
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

  // Método para cerrar el modal
  closeModalFunction() {
    this.showRegisterModal = false;
    this.closeModal.emit(); // Emitir el evento de cerrar el modal
  }
}
