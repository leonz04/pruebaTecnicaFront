import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent {

  filterForm: FormGroup; // Formulario para filtros

  @Output() filtersChanged = new EventEmitter<any>(); // Emite los filtros al componente padre

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      first_name: [''],
      middle_name: [''],
      last_name: [''],
      second_last_name: [''],
      identification_type: [''],
      identification_number: [''],
      country: [''],
      email: [''],
      status: ['']
    });
  }

  // Emitir filtros cada vez que cambian
  onFilterChange() {
    this.filtersChanged.emit(this.filterForm.value);
  }
}
