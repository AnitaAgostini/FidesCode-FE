import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Utente } from '../_model/utente';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string;
  password: string;
  submitted: boolean = false;
  loginForm: FormGroup;
  utente: Utente;
  loading: boolean = false;
  returnUrl: string;
  error: string;
  success: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router)
          {

          }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    // show success message on registration
    if (this.route.snapshot.queryParams.registered) {
        this.success = 'Registration successful';
    }
}

get f() { return this.loginForm.controls; }


onSubmit() {
  this.submitted = true;

  // reset alerts on submit
  this.error = null;
  this.success = null;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.error = error;
              this.loading = false;
          });
}


}
