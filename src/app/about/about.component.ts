import { Component, OnInit } from '@angular/core';
import { AlertService } from '../Services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor( private alertService: AlertService) { }

  ngOnInit() {
  }
  success(message: string) {
    console.log(message);
    this.alertService.success(message);
}
error(message: string) {
  this.alertService.error(message);
}

info(message: string) {
  this.alertService.info(message);
}

warn(message: string) {
  this.alertService.warn(message);
}

clear() {
  this.alertService.clear();
}
}
