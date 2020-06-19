import { Component, OnInit } from '@angular/core';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-single-volunteer',
  templateUrl: './single-volunteer.component.html',
  styleUrls: ['./single-volunteer.component.scss']
})
export class SingleVolunteerComponent implements OnInit {

  id: any;
  volunteer: any;
  isSubmitted = false;
  minDate = new Date();
  maxDate = new Date();
  active = false;
  startDate: any;
  endDate: any;
  volunteerForm: FormGroup;
  constructor(
    private volunteersService: VolunteersService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) {
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
      });


      if (this.id) {
        this.volunteersService.getVolunteer(this.id).subscribe(data => {
          this.volunteer = data;
          this.startDate = this.volunteer.start_date;
          this.endDate = this.volunteer.end_date;
          this.active = this.volunteer.status === 'active';
          this.volunteerForm = new FormGroup({
            firstname: new FormControl(this.volunteer.firstname || ''),
            lastname: new FormControl(this.volunteer.lastname || ''),
            country: new FormControl(this.volunteer.country || ''),
            email: new FormControl(this.volunteer.email || ''),
            phone: new FormControl(this.volunteer.phone || ''),
            description: new FormControl(this.volunteer.description || ''),
            startDate: new FormControl(this.volunteer.start_date),
            endDate: new FormControl(this.volunteer.end_date),
            longitude: new FormControl(this.volunteer.longitude),
            latitude: new FormControl(this.volunteer.latitude)
          });

          this.startDate = this.volunteer.start_date;
          this.endDate = this.volunteer.end_date;
        });
      } else {
        this.volunteerForm = new FormGroup({
          firstname: new FormControl(''),
          lastname: new FormControl(''),
          country: new FormControl(''),
          email: new FormControl(''),
          phone: new FormControl(''),
          description: new FormControl(''),
          startDate: new FormControl(''),
          endDate: new FormControl(''),
          longitude: new FormControl(0),
          latitude: new FormControl(0)
        });
      }
   }
   setActive () {
     this.active = !this.active;
   }
   getActive () {
     return this.active ? 'active' : 'suspended';
   }

  ngOnInit(): void {
  }

  setMinDate (date) {
    this.minDate = date;
  }
  setMaxDate (date) {
    this.maxDate = date;
  }
  submit () {
    if (this.volunteerForm.invalid) {
      this.isSubmitted = false;
      alert('Please fill all the information!');
      return;
    }
    console.log(this.f.startDate.value, this.f.endDate.value)
    if (this.id) {
      this.volunteersService.updateVolunteer({
        id: this.id,
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        country: this.f.country.value,
        email: this.f.email.value,
        phone: this.f.phone.value,
        description: this.f.description.value,
        start_date: this.f.startDate.value,
        end_date: this.f.endDate.value,
        status: this.getActive(),
        longitude: this.f.longitude.value,
        latitude: this.f.latitude.value
      }).subscribe(res => {
        this.router.navigateByUrl('/volunteers');
        this.notificationService.notify('Updated successfully!');
        this.isSubmitted = false;
      }, err => {
        this.notificationService.notify('An error occured while trying to update, please try again later');
        this.isSubmitted = false;
      });
    } else {
      this.volunteersService.saveVolunteer({
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        country: this.f.country.value,
        email: this.f.email.value,
        phone: this.f.phone.value,
        description: this.f.firstname.value,
        start_date: this.f.startDate.value,
        end_date: this.f.endDate.value,
        status: this.getActive(),
        longitude: this.f.longitude.value,
        latitude: this.f.latitude.value
      }).subscribe(res => {
        this.router.navigateByUrl('/volunteers');
        this.notificationService.notify('Updated successfully!');
        this.isSubmitted = false;
      }, err => {
        this.notificationService.notify('An error occured while trying to update, please try again later');
        this.isSubmitted = false;
      });
    }
  }
  get f() {
    return this.volunteerForm.controls;
  }
}
