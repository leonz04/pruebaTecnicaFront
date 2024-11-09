import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFilterComponent } from './user-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UserFilterComponent', () => {
  let component: UserFilterComponent;
  let fixture: ComponentFixture<UserFilterComponent>;
  let emitter: EventEmitter<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFilterComponent ],
      imports: [ ReactiveFormsModule ],  // Importamos ReactiveFormsModule para trabajar con formularios reactivos
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFilterComponent);
    component = fixture.componentInstance;
    emitter = component.filtersChanged;
    fixture.detectChanges();  // Detecta cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado correctamente
  });

  it('should initialize the form with default values', () => {
    expect(component.filterForm).toBeTruthy();  // Asegurarse de que el formulario se ha creado
    expect(component.filterForm.value).toEqual({
      first_name: '',
      middle_name: '',
      last_name: '',
      second_last_name: '',
      identification_type: '',
      identification_number: '',
      country: '',
      email: '',
      status: ''
    });  // Verifica que los valores iniciales sean los esperados
  });

  it('should emit filters when onFilterChange is called', () => {
    // Especificamos el valor que queremos que se emita
    const expectedFilters = {
      first_name: 'John',
      middle_name: 'Doe',
      last_name: 'Smith',
      second_last_name: 'Jones',
      identification_type: 'ID',
      identification_number: '12345',
      country: 'USA',
      email: 'john.doe@example.com',
      status: 'active'
    };
  
    // Llenamos el formulario con los valores de prueba
    component.filterForm.setValue(expectedFilters);
  
    spyOn(emitter, 'emit');  // Espiamos el método emit del EventEmitter
  
    component.onFilterChange();  // Llamamos al método que debería emitir los filtros
  
    expect(emitter.emit).toHaveBeenCalledWith(expectedFilters);  // Verificamos que el evento emitió los valores correctos
  });

  it('should emit the updated filters when the user interacts with the form', async () => {
    spyOn(component.filtersChanged, 'emit');  // Espiamos el método emit del EventEmitter
  
    fixture.detectChanges();  // Nos aseguramos de que el formulario esté completamente renderizado
  
    // Esperamos a que el DOM se estabilice
    await fixture.whenStable();
  
    // Buscamos el campo de entrada para el primer nombre
    const firstNameInput = fixture.debugElement.query(By.css('input[name="first_name"]'));
    if (!firstNameInput) {
      fail('El campo first_name no se encuentra en el DOM');
    }
  
    // Simulamos un cambio en el valor del campo 'first_name'
    firstNameInput.nativeElement.value = 'Alice';
    firstNameInput.nativeElement.dispatchEvent(new Event('input'));  // Disparamos el evento 'input'
  
    fixture.detectChanges();  // Detectamos los cambios después del evento
  
    // Llamamos al método que debería emitir los filtros
    component.onFilterChange();
  
    // Verificamos si se ha emitido el valor correcto
    expect(component.filtersChanged.emit).toHaveBeenCalledWith({
      first_name: 'Alice',
      middle_name: '',
      last_name: '',
      second_last_name: '',
      identification_type: '',
      identification_number: '',
      country: '',
      email: '',
      status: ''
    });
  });
});
