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
        console.log(data)
        this.volunteer = data;
        console.log(this.volunteer);
        this.startDate = this.getFormattedDate(new Date(this.volunteer.dateofstart_volunteer));
        this.endDate = this.getFormattedDate(new Date(this.volunteer.dateofend_volunteer));
        this.active = this.volunteer.status_volunteer === 'active';
        this.volunteerForm = new FormGroup({
          firstname: new FormControl(this.volunteer.firstname_volunteer || ''),
          lastname: new FormControl(this.volunteer.lastname_volunteere || ''),
          country: new FormControl(this.volunteer.country_volunteer || ''),
          email: new FormControl(this.volunteer.email_volunteer || ''),
          phone: new FormControl(this.volunteer.phone_volunteer || ''),
          description: new FormControl(this.volunteer.description_volunteer || ''),
          startDate: new FormControl(this.startDate),
          endDate: new FormControl(this.endDate),
          longitude: new FormControl(this.volunteer.longitude_volunteer),
          latitude: new FormControl(this.volunteer.latitude_volunteer)
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
  getFormattedDate(date) {

    const year = date.getFullYear(),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = date.getDate()

    console.log(
      [year, month, day].join('-')
    )
    return [year, month, day].join('-');
  }

  setActive() {
    this.active = !this.active;
  }
  getActive() {
    return this.active ? 'active' : 'suspended';
  }

  ngOnInit(): void {
  }

  setMinDate(date) {
    this.minDate = date;
  }
  setMaxDate(date) {
    this.maxDate = date;
  }
  submit() {
    if (this.volunteerForm.invalid) {
      this.isSubmitted = false;
      alert('Please fill all the information!');
      return;
    }
    console.log(this.f.startDate.value, this.f.endDate.value)
    if (this.id) {
      this.volunteersService.updateVolunteer({
        id_volunteer: this.id,
        firstname_volunteer: this.f.firstname.value,
        lastname_volunteer: this.f.lastname.value,
        country_volunteer: this.f.country.value,
        email_volunteer: this.f.email.value,
        phone_volunteer: this.f.phone.value,
        description_volunteer: this.f.description.value,
        dateofstart_volunteer: this.getFormattedDate(new Date(this.f.startDate.value)),
        dateofend_volunteer: this.getFormattedDate(new Date(this.f.endDate.value)),
        status_volunteer: this.getActive(),
        longitude_volunteer: this.f.longitude.value,
        latitude_volunteer: this.f.latitude.value
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
        firstname_volunteer: this.f.firstname.value,
        lastname_volunteer: this.f.lastname.value,
        country_volunteer: this.f.country.value,
        email_volunteer: this.f.email.value,
        phone_volunteer: this.f.phone.value,
        description_volunteer: this.f.firstname.value,
        dateofstart_volunteer:  this.getFormattedDate(new Date(this.f.startDate.value)),
        dateofend_volunteer: this.getFormattedDate(new Date(this.f.endDate.value)),
        status_volunteer: this.getActive(),
        longitude_volunteer: this.f.longitude.value,
        latitude_volunteer: this.f.latitude.value
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
