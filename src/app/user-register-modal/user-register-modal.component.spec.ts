import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegisterModalComponent } from './user-register-modal.component';
import { UserListComponent } from '../user-list/user-list.component'; // Importa el componente UserList
import { UserService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('UserRegisterModalComponent', () => {
  let component: UserRegisterModalComponent;
  let fixture: ComponentFixture<UserRegisterModalComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let userListComponentSpy: jasmine.SpyObj<UserListComponent>;

  beforeEach(() => {
    // Crear espías para UserService y ToastrService
    userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      declarations: [UserRegisterModalComponent, UserListComponent], // Incluir UserListComponent
      imports: [FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: UserListComponent, useValue: userListComponentSpy }  // Usamos el espía de UserListComponent
      ]
    });

    fixture = TestBed.createComponent(UserRegisterModalComponent);
    component = fixture.componentInstance;

    // Inicializar cualquier valor necesario en el componente antes de llamar a onRegister()
    component.showRegisterModal = true;  // Asegúrate de que esta propiedad esté correctamente definida
    component.resetForm = jasmine.createSpy('resetForm');  // Espiar el método resetForm

    fixture.detectChanges();  // Detectar los cambios en el componente

    // Asegúrate de que el espía está devolviendo una función para loadUsers
  });

  it('should call registerUser with the correct parameters', fakeAsync(() => {
    const userData = {
      id: 0,
      first_name: 'ANDRES',
      middle_name: 'FELIPE',
      last_name: 'LEON',
      second_last_name: 'ZAPATA',
      country: 'Colombia',
      identification_type: 'Pasaporte',
      identification_number: '122fdf3456',
      hire_date: '2024-11-06',
      area: 'Talento Humano',
      status: 'Activo'
    };

    // Mock de la respuesta del servicio
    userServiceSpy.registerUser.and.returnValue(of({ ...userData, id: 1 }));

    // Asignar los valores al componente
    component.firstName = userData.first_name;
    component.middleName = userData.middle_name;
    component.lastName = userData.last_name;
    component.secondLastName = userData.second_last_name;
    component.country = userData.country;
    component.identificationType = userData.identification_type;
    component.identificationNumber = userData.identification_number;
    component.hireDate = userData.hire_date;
    component.area = userData.area;
    component.status = userData.status;

    // Llamar a onRegister
    component.onRegister();
    tick();

    // Verificar que registerUser fue llamado correctamente
    expect(userServiceSpy.registerUser).toHaveBeenCalledWith({
      id: 0,
      first_name: 'ANDRES',
      middle_name: 'FELIPE',
      last_name: 'LEON',
      second_last_name: 'ZAPATA',
      country: 'Colombia',
      identification_type: 'Pasaporte',
      identification_number: '122fdf3456',
      hire_date: '2024-11-06',
      area: 'Talento Humano',
      status: 'Activo',
    });

   

    
    // Verificar que toastr se haya llamado
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Usuario registrado con éxito', 'Registro exitoso');
  }));

});
