import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  isLoading = false;
  errorMessage: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.signin(email, password);
      this.errorMessage = null;
    } else {
      authObservable = this.authService.signup(email, password);
      this.errorMessage = null;
    }

    authObservable.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errMes) => {
        console.log(errMes);
        this.errorMessage = errMes;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }
}
