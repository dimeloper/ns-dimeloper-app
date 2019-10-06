import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Router } from '@angular/router';
import { AuthService } from '~/app/auth/auth.service';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  isLogin = true;
  isLoading = false;

  @ViewChild('emailEl', {static: false}) emailEl: ElementRef<TextField>;
  @ViewChild('passwordEl', {static: false}) passwordEl: ElementRef<TextField>;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)]
      })
    });

    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordControlIsValid = status === 'VALID';
    });
  }

  onSubmit() {
    this.blurForm();

    if (!this.form.valid) {
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.form.reset();

    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;

    this.isLoading = true;
    if (this.isLogin) {
      this.authService.login(email, password).subscribe(resData => {
        this.isLoading = false;
        this.router.navigate(['/challenges']);
      }, error => {
        console.error(error);
        this.isLoading = false;
      });
    } else {
      this.authService.register(email, password).subscribe(resData => {
        this.isLoading = false;
        this.router.navigate(['/challenges']);
      }, error => {
        console.error(error);
        this.isLoading = false;
      });
    }

  }

  onInputDone() {
    this.blurForm();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  private blurForm() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }

}
