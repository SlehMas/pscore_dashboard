import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit {

  article: any;
  articleForm: FormGroup;
  id: any;
  isSubmitted: Boolean = false;
  error: any;
  currentUser = this.authenticationSerivce.currentUserValue;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private notificationService: NotificationService,
    private authenticationSerivce: AuthenticationService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.articleService.getArticle(this.id).subscribe(data => {
        this.article = data;
        console.log(
          this.article
        )
        this.articleForm = new FormGroup({
          subject_article: new FormControl(this.article.subject_article || ''),
          body_article: new FormControl(this.article.body_article || ''),
          author_article: new FormControl(this.currentUser.username_user)
        });
      });
    } else {
      this.articleForm = new FormGroup({
        subject_article: new FormControl(''),
        body_article: new FormControl(''),
        author_article: new FormControl(this.currentUser.username_user)
      });
    }
  }

  submit () {
    const now = new Date().toLocaleDateString();
    console.log(now);
    this.isSubmitted = true;
    if (this.articleForm.invalid) {
      this.isSubmitted = false;
      return;
    }

    if (this.id) {
      this.articleService.updateArticle({
        id_article: this.id,
        subject_article: this.f.subject_article.value,
        author_article: this.f.author_article,
        body_article: this.f.body_article.value,
        date_article: now
      }).subscribe(res => {
        this.router.navigateByUrl('/article');
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
    this.articleService.saveArticle({
      subject_article: this.f.subject_article.value,
      author_article: this.currentUser.username_user,
      body_article: this.f.body_article.value,
      date_article: now
    }).subscribe(res => {
      this.notificationService.notify('Added successfully!');
      this.router.navigateByUrl('/article');
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
    return this.articleForm.controls;
  }

}
