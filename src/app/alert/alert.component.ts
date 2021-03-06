import { Component, OnInit } from '@angular/core';
import {AlertService} from '../Services/index';
import { Alert, AlertType } from '../models/alert';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          console.log( this.alerts );
          return;
      }

      // add alert to array
      this.alerts.push(alert);
  });

}
removeAlert(alert: Alert) {
  this.alerts = this.alerts.filter(x => x !== alert);
}

cssClass(alert: Alert) {
  if (!alert) {
      return;
  }

  // return css class based on alert type
  switch (alert.type) {
      case AlertType.Success:
          return 'alert alert-success';
      case AlertType.Error:
          return 'alert alert-danger';
      case AlertType.Info:
          return 'alert alert-info';
      case AlertType.Warning:
          return 'alert alert-warning';
  }
}
}

