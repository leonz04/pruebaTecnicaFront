import { Observable, of } from 'rxjs';
import { User } from '../models/user.model'; // Asegúrate de que la ruta sea correcta

export class MockUserService {
  registerUser(user: User): Observable<User> {
    // Aquí puedes simular la respuesta que deseas devolver
    return of({ ...user, id: 1 }); // Simula una respuesta con un usuario ficticio y un id
  }
}
