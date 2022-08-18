import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UserAddComponent,
    data: { title: 'User Sign up' }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'User List' }
  },
  {
    path: 'user/:cpf',
    component: UserAddComponent,
    data: { title: 'User Update' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
