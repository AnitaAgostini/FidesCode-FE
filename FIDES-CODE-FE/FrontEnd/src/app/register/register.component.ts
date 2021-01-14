import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Utente } from 'src/app/_model/utente';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  utente: Utente;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  currentAdmin: Utente;
  enableCheckAll: true;
  userNominative: string;
  spazio: string = ' ';

  constructor(

      private http: HttpClient,
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {

      this.currentAdmin = this.authenticationService.currentUserValue;

      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }


  ngOnInit() {


      this.registerForm = this.formBuilder.group({

          name: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          email: ['', [Validators.required, Validators.email]],
          date: ['', [Validators.required]]

      });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid){
          return;
      }

      this.loading = true;

      this.mappingFormToDTO(this.registerForm.value);

      this.userService.register(this.utente)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['/login'], { queryParams: { registered: true }});
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }


  mappingFormToDTO(form: any){


    this.userNominative = form.name.concat(this.spazio.concat(form.lastName.toString()));
    console.log(this.userNominative);

    this.utente = new Utente();
    this.utente.username = form.username;
    this.utente.userNominative = this.userNominative;
    this.utente.email = form.email;
    this.utente.password = form.password;
  }
}
