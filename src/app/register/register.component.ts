import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AlertService } from '../Services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  loading = false;
  user: any = [];
  userResult: any = [];
    constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }


  ngOnInit() {
  }
  register() {
    this.loading = true;
    this.userService.create(this.model)
        .subscribe(
        data => {
            this.userResult = data;
            console.log(this.userResult);
            if (this.userResult.status === true) {
                this.loading = false;
                this.model = {};
                this.alertService.success('Registration successful', true);
                this.router.navigate(['login']);
            } else {
                this.alertService.error(this.userResult.message, true);
                this.loading = false;
            }
        },
        error => {
            this.alertService.error(error._body);
            this.loading = false;
        });
}
}
