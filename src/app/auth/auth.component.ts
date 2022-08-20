import { Store } from '@ngrx/store';
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { PlaceholderDirective } from './../shared/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from './../shared/alert/alert.component';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false;
  isLoading = false;
  errorMessage: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cmpFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.isLoading;
      this.errorMessage = authState.authError;
      if (this.errorMessage) {
        this.showErrorAlert(this.errorMessage);
      }
    });
  }

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
      // authObservable = this.authService.signin(email, password);
      this.store.dispatch(
        new AuthActions.StartLogin({ email: email, password: password })
      );
      this.errorMessage = null;
    } else {
      authObservable = this.authService.signup(email, password);
      this.errorMessage = null;
    }

    // authObservable.subscribe(
    //   (resData) => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errMes) => {
    //     console.log(errMes);
    //     this.errorMessage = errMes;
    //     this.showErrorAlert(errMes);
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory =
      this.cmpFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const cmpRef = hostViewContainerRef.createComponent(alertCmpFactory);

    cmpRef.instance.message = message;
    this.closeSub = cmpRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
