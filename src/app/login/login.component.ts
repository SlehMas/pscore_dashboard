import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  error = '';

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  onLoggedin() {
    console.log('skkrt')
    // reset every attempt
    this.isSubmitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'Please fill the form';
      return;
    }
    console.log(this.f.username.value, this.f.password.value);
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.route.snapshot.paramMap.get('returnUrl'));
          localStorage.setItem('isLoggedin', 'true');
          this.router.navigateByUrl(this.route.snapshot.paramMap.get('returnUrl') || '/');
        },
        error => {
          this.error = 'Please check your credentials!';
          this.isSubmitted = false;
        });
  }
}
