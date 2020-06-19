import { Component, OnInit } from '@angular/core';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {
  volunteers: any[] = [];
  error: string;
  toDelete: any;
  constructor(
    private volunteersService: VolunteersService,
    private notificationService: NotificationService) {

    this.volunteersService.getVolunteers().subscribe(data => this.volunteers = data);
   }

  ngOnInit(): void {
  }

  showModal (selected) {
    this.toDelete = selected;
    document.getElementById('exampleModal').style.display = 'block';
    document.getElementById('exampleModal').style.backgroundColor = 'rgba(0,0,0,0.56)';
  }
  closeModal () {
    this.toDelete = -1;
    document.getElementById('exampleModal').style.display = 'none';
  }

  delete () {
    this.volunteersService.deleteVolunteer(this.toDelete).subscribe(res => {
      this.volunteers = this.volunteers.filter(a => a.id !== this.toDelete);
      this.notificationService.notify('Deleted successfully!');
      this.closeModal();
    }, err => {
      this.error = err;
    });
  }
}
