import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/users'; // URL de tu API

  constructor(private http: HttpClient) {}

   // Método para registrar un nuevo usuario
   registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError<User>('registerUser'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  // Método para obtener todos los usuarios
  getUsers(){
    return this.http.get<any>(this.apiUrl);
  }

  // Método para eliminar un usuario
  deleteUser(userId: number) {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  } 

  // Método para actualizar un usuario
  updateUser(userId: number, user: any) {
    return this.http.put(`${this.apiUrl}/${userId}`, user);
  }
}