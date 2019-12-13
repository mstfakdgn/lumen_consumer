import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from './services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from './models/User.model';
import { ChildActivationStart } from '@angular/router';
import { AccessTokenService } from './services/access-token.service';
import { environment, CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, SCOPE } from '../environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'lumen-consumer';
  checkoutForm;
  checkoutFormUpdate;
  checkoutFormDelete;
  checkoutFormShowUser;

  singleUser;
  updatedUser;
  deletedUser;

  showSingleUser = false;

  users: User[] = [];
  getUsersSubscriber;

  accessTokenBearer;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    private tokenService: AccessTokenService
  ) {}

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });

    this.checkoutFormUpdate = this.formBuilder.group({
      id: '',
      nameUpdate: '',
      emailUpdate: '',
      passwordUpdate: '',
      password_confirmationUpdate: '',
    });

    this.checkoutFormDelete = this.formBuilder.group({
      id: '',
    });

    this.checkoutFormShowUser = this.formBuilder.group({
      id: '',
    });
  }


  showUsers() {
    this.spinner.show();
    this.userService.showUsers().subscribe(users => {
      this.users = users;
      this.spinner.hide();
    });
    // this.getUsersSubscriber = this.userService.showUsers().subscribe((users) => {
    //   console.log(typeof users.data);
    //   console.log(users.data);
    //   this.users = users.data;
    // });
  }

  addUsers() {
    this.userService.addUser(null , this.checkoutForm.value.name, this.checkoutForm.value.email, this.checkoutForm.value.password, this.checkoutForm.value.password_confirmation).subscribe(user => {
    });
  }

  showUser() {
    this.userService.showUser(this.checkoutFormShowUser.value.id).subscribe((singleUser: User[]) => {
      this.showSingleUser = true;
      this. singleUser = new User(singleUser.data.id, singleUser.data.name, singleUser.data.email, singleUser.data.password, singleUser.data.password_confirmation);

    });
  }

  updateUsers() {
    console.log(this.checkoutFormUpdate);
    this.userService.updateUser(this.checkoutFormUpdate.value.id , this.checkoutFormUpdate.value.nameUpdate, this.checkoutFormUpdate.value.emailUpdate, this.checkoutFormUpdate.value.passwordUpdate, this.checkoutFormUpdate.value.password_confirmationUpdate).subscribe( updatedUser => {
      this.updatedUser = new User(updatedUser.data.id, updatedUser.data.name, updatedUser.data.email, updatedUser.data.password, updatedUser.data.password_confirmation);
      console.log(this.updatedUser);
    });
  }

  deleteUsers() {
    this.userService.deleteUser(this.checkoutFormDelete.value.id).subscribe(deletedUser => {
      this.deletedUser = new User(deletedUser.data.id, deletedUser.data.name, deletedUser.data.email, deletedUser.data.password, deletedUser.data.password_confirmation);
    });
  }
}
