import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  name: string;
  cpf: string;
  phone: string;
  email: string;
}

const endpoint = 'https://private-9d65b3-tinnova.apiary-mock.com/users';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<User>(endpoint).pipe(
      catchError(this.handleError)
    );
  }

  createUserList(userList: User[]): void {
    if (!localStorage.getItem('userList')) {
      localStorage.setItem('userList', JSON.stringify(userList))
    }
  }

  getUsersLocalStorage() {
    return localStorage.getItem('userList');
  }

  addUser(user: User): void {
    const userData = localStorage.getItem('userList');
    if (userData) {
      const newUserList = JSON.parse(userData);
      newUserList.push(user);


      localStorage.setItem('userList', JSON.stringify(newUserList));
    } else {
      localStorage.setItem('userList', JSON.stringify([user]));
    }
  }

  getUser(cpf: string) {
    const userData = localStorage.getItem('userList');
    if (userData) {
      const userList = JSON.parse(userData);
      return userList.filter((i: User) => i.cpf === cpf)[0];
    }
  }

  updateUser(cpf: string, user: User): void {
    const userData = localStorage.getItem('userList');
    if (userData) {
      const userList = JSON.parse(userData);
      const newUserList = userList.filter((i: User) => i.cpf !== cpf);
      newUserList.push(user);
      
      localStorage.setItem('userList', JSON.stringify(newUserList));
    }
  }

  deleteUser(user: string): void {
    const userData = localStorage.getItem('userList');
    if (userData) {
      const newUserList = JSON.parse(userData);
      newUserList.pop(user);
      localStorage.setItem('userList', JSON.stringify(newUserList));
    }
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
