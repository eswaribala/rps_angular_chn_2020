import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import {UserService} from '../services/userservice';
import {MatPaginator} from "@angular/material/paginator";

import {MatSnackBar} from "@angular/material/snack-bar";



@Component({ templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']})
export class RegisterComponent  {
  durationInSeconds = 5;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  userName: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  regGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService,private router:Router,private _snackBar:MatSnackBar) {
    this.firstName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{5,30}')]);
    this.lastName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{5,30}')]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.userName = new FormControl('', [Validators.required,
      Validators.pattern('[a-zA-Z]{5,12}')]);
    /*this.password=new FormControl('',[Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})')]);*/
    this.password = new FormControl('', [Validators.required,
      Validators.pattern('[a-zA-Z0-9]{5,8}')]);
    this.confirmPassword = new FormControl('', [Validators.required]);
    this.regGroup = formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      userName: this.userName,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  register() {
    console.log(this.regGroup.value);
    let data = this.regGroup.value;
    let obj = {
     firstName: data.firstName,
     lastName: data.lastName,
     email: data.email,
     userName: data.userName,
     password: data.password
   };
    this.userService.addBOAUser(obj).subscribe(response => {
      console.log(response);

     this.router.navigate(["/Login"]);

    }, error => console.log('oops error occurred!!!!!!!!!', error));

  }
}

/*
registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
 */
