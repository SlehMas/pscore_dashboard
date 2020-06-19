import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: any[] = [];
  constructor(private userService: UserService) {
    this.userService.getAllApplications().subscribe(res => {
      this.applications = res;
    });
   }

  ngOnInit(): void {
  }
}
