import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API = 'http://localhost:3000/Users'

  constructor(private http: HttpClient) { }

  listar(): Observable<User[]> {
    return this.http.get<User[]>(this.API)
  }

  criar(User: User): Observable<User> {
    return this.http.post<User>(this.API, User)
  }

  editar(User: User): Observable<User> {
    const url = `${this.API}/${User.id}`
    return this.http.put<User>(url, User )

  }

  excluir(id: number): Observable<User> {
    const url = `${this.API}/${id}`
    return this.http.delete<User>(url)
  }

  buscarPorId(id: number): Observable<User> {
    const url = `${this.API}/${id}`
    return this.http.get<User>(url)
  }

}
