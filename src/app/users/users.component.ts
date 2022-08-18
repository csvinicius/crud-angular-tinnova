import { Component, OnInit } from '@angular/core';
import { RestService, User } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(
    public rest: RestService,
    public router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    const userLocalStorage = this.rest.getUsersLocalStorage();
    if (userLocalStorage) {
      this.users = JSON.parse(userLocalStorage);
    }
  }

  editUser(user: User){
    this.router.navigate(['user', user.cpf]);
  }

  deleteUser(user: User){
    this.rest.deleteUser(JSON.stringify(user));
    this.getUsers();
  }

}