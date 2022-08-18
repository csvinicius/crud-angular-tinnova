import { Component, OnInit } from '@angular/core';
import { RestService, User } from '../rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})

export class UserAddComponent implements OnInit {
  newUserForm: FormGroup;
  loading: boolean;
  routeSub: Subscription;
  editMode: boolean;
  user: User;

  constructor(
    public rest: RestService,
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      phone: ['', [Validators.required, Validators.minLength(11)]]
    });
    this.createUserList();

    this.routeSub = this.route.params.subscribe(params => {
      const cpf = params['cpf'];
      if (cpf) {
        this.getUser(cpf);
        this.editMode = true;
        this.newUserForm.controls['name'].disable();
        this.newUserForm.controls['cpf'].disable();
      }
    });
  }

  createUserList() {
    this.rest.getUsers().subscribe(res => {
      this.rest.createUserList(res);
    });
  }

  addUser(): void {
    this.loading = true;
    this.rest.addUser(this.newUserForm.value);
    this.loading = false;
    this.router.navigate(['/users']);
  }

  getUser(cpf: string) {
    this.user = this.rest.getUser(cpf);
    this.updateForm(this.user);
  }

  updateForm(user: User): void {
    this.newUserForm.controls['name'].setValue(user.name);
    this.newUserForm.controls['email'].setValue(user.email);
    this.newUserForm.controls['cpf'].setValue(user.cpf);
    this.newUserForm.controls['phone'].setValue(user.phone);
  }

  updateUser(): void {
    this.loading = true;
    const updatedUser = {
      name: this.user.name,
      email: this.newUserForm.controls['email'].value,
      cpf: this.user.cpf,
      phone: this.newUserForm.controls['phone'].value,
    } as User;
    this.rest.updateUser(this.newUserForm.controls['cpf'].value, updatedUser);
    this.loading = false;
    this.router.navigate(['/users']);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}