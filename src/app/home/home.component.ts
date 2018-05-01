import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  display = 'none';
  user: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  openModal() {
    this.display = 'block';
 }
 onCloseHandled() {
  this.display = 'none';
}

}
