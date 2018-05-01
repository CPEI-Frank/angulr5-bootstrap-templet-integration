import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }
  getUser() {

    this.userService.getUser().subscribe(data => {
      this.user = data;
  });
  }
}
