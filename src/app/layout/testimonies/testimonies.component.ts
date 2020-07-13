import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { TestimonyService } from 'src/app/services/testimony.service';
@Component({
  selector: 'app-testimonies',
  templateUrl: './testimonies.component.html',
  styleUrls: ['./testimonies.component.scss']
})
export class TestimoniesComponent implements OnInit {

  toDelete = -1;
  testimonies: any[] = [];
  error: '';
  constructor(
    private notificationService: NotificationService,
    private testimonyService: TestimonyService) { }

  ngOnInit(): void {
    this.testimonyService.getTestimonys().subscribe(data => this.testimonies = data.sort((a, b) => b.id_testimony - a.id_testimony));
  }

  showModal (selected) {
    this.toDelete = selected;
    document.getElementById('testimoniesModal').style.display = 'block';
    document.getElementById('testimoniesModal').style.backgroundColor = 'rgba(0,0,0,0.56)';
  }
  closeModal () {
    this.toDelete = -1;
    document.getElementById('testimoniesModal').style.display = 'none';
  }
  delete () {
    this.testimonyService.deleteTestimony(this.toDelete).subscribe(res => {
      this.testimonies = this.testimonies.filter(a => a.id_testimony !== this.toDelete);
      this.notificationService.notify('Deleted successfully!');
      this.closeModal();
    }, err => {
      this.error = err;
    });
  }

}
