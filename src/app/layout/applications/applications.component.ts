import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: any[] = [];
  toUpdate: any;
  status = '';
  constructor(private userService: UserService) {
    this.userService.getAllApplications().subscribe(res => {
      this.applications = res;
    });
  }

  ngOnInit(): void {
  }

  showModal(selected, status) {
    this.toUpdate = selected;
    console.log(this.toUpdate)
    this.status = status;
    document.getElementById('updateApplicationModal').style.display = 'block';
    document.getElementById('updateApplicationModal').style.backgroundColor = 'rgba(0,0,0,0.56)';
  }
  closeModal() {
    this.toUpdate = {};
    this.status = '';
    document.getElementById('updateApplicationModal').style.display = 'none';
  }

  updateApplication() {

    const foundIndex = this.applications.findIndex(o => o.id_application === this.toUpdate.id_application);
    this.userService.updateApplication(this.status, this.toUpdate.id_application).subscribe(res => {
      const application = this.applications[foundIndex];
      this.applications[foundIndex].status_application = this.status;
      if (this.status === 'accepted') {
        this.userService.updateUser({
          id_user: application.id_user_application,
          status_user: application.type_application
        }).subscribe(() => {});
      }
      this.closeModal();
    });
  }

}
