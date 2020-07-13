import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TestimonyService } from 'src/app/services/testimony.service';
@Component({
  selector: 'app-single-testimony',
  templateUrl: './single-testimony.component.html',
  styleUrls: ['./single-testimony.component.scss']
})
export class SingleTestimonyComponent implements OnInit {

  testimony: any;
  testimonyForm: FormGroup;
  id: any;
  isSubmitted: Boolean = false;
  error: any;
  currentUser = this.authenticationSerivce.currentUserValue;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testimonyService: TestimonyService,
    private notificationService: NotificationService,
    private authenticationSerivce: AuthenticationService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.testimonyService.getTestimony(this.id).subscribe(data => {
        this.testimony = data;
        console.log(this.testimony)
        this.testimonyForm = new FormGroup({
          subject_testimony: new FormControl(this.testimony.subject_testimony || ''),
          body_testimony: new FormControl(this.testimony.body_testimony || ''),
          author_testimony: new FormControl(this.testimony.author_testimony || '')
        });
      });
    } else {
      this.testimonyForm = new FormGroup({
        subject_testimony: new FormControl(''),
        author_testimony: new FormControl(this.currentUser.username_user),
        body_testimony: new FormControl('')
      });
    }
  }

  submit () {
    const now = new Date().toLocaleDateString();
    console.log(now);
    this.isSubmitted = true;
    if (this.testimonyForm.invalid) {
      this.isSubmitted = false;
      return;
    }

    if (this.id) {
      this.testimonyService.updateTestimony({
        id_testimony: this.id,
        subject_testimony: this.f.subject_testimony.value,
        author_testimony: this.f.author_testimony.value,
        body_testimony: this.f.body_testimony.value,
      }).subscribe(res => {
        this.router.navigateByUrl('/testimonies');
        this.notificationService.notify('Updated successfully!');
        this.isSubmitted = false;
      }, err => {
        this.error = err;
        this.notificationService.notify('An error occured while trying to update, please try again later');
        this.isSubmitted = false;
      });
      return;
    }
    console.log('Saving new testimony');
    this.testimonyService.saveTestimony({
      subject_testimony: this.f.subject_testimony.value,
      author_testimony: this.f.author_testimony.value,
      body_testimony: this.f.body_testimony.value,
    }).subscribe(res => {
      this.notificationService.notify('Added successfully!');
      this.router.navigateByUrl('/testimonies');
      this.isSubmitted = false;
    }, err => {
      this.error = err;
      this.notificationService.notify('An error occured while trying to save, please try again later');
      this.isSubmitted = false;
    });
  }

  ngOnInit(): void {

  }

  get f() {
    return this.testimonyForm.controls;
  }

}
