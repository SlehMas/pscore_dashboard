import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  message: String;
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.sharedMessage.subscribe(val => {
      console.log(val);
      this.message = val
    })
  }
}
