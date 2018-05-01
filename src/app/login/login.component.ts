import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../Services/index';
import { User } from '../models/index';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('0ms ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  model:  any = {};
  loading = false;
  returnUrl: string;
  user: any = [];
  show = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get stateName() {
    return this.show ? 'show' : 'hide';
  }


  toggle() {
    this.show = !this.show;
  }
  login() {
    this.loading = true;
    this.userService.login(this.model)
      .subscribe(
        data => {
           this.user = data;
          if ( this.user.status) {
            console.log( this.user);
            this.loading = false;
            if ( this.user.status &&  this.user.value.tokenString) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify( this.user.value));
            }
            // if (this.returnUrl !== '' || this.returnUrl !== undefined) {
            //   this.router.navigate([this.returnUrl]);
            // }
            this.router.navigate(['home']);
          } else {
            this.loading = false;
            this.alertService.error( this.user.message);
          }

        },
        error => {
          this.alertService.error(error._body);
          this.loading = false;
        });
  }

}
