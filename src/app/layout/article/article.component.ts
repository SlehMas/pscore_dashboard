import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  toDelete = -1;
  articles: any[] = [];
  error: '';
  constructor(private articleService: ArticleService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(data => this.articles = data.sort((a, b) => b.id - a.id));
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
    this.articleService.deleteArticle(this.toDelete).subscribe(res => {
      this.articles = this.articles.filter(a => a.id !== this.toDelete);
      this.notificationService.notify('Deleted successfully!');
      this.closeModal();
    }, err => {
      this.error = err;
    });
  }

}
