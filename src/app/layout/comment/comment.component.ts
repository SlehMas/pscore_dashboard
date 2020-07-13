import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  toDelete = -1;
  comments: any[] = [];
  error: '';
  constructor(private commentService: CommentService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.commentService.getComments().subscribe(data => this.comments = data.sort((a, b) => b.id - a.id));
  }

  showModal (selected) {
    this.toDelete = selected;
    document.getElementById('commentModal').style.display = 'block';
    document.getElementById('commentModal').style.backgroundColor = 'rgba(0,0,0,0.56)';
  }
  closeModal () {
    this.toDelete = -1;
    document.getElementById('commentModal').style.display = 'none';
  }
  delete () {
    this.commentService.deleteComment(this.toDelete).subscribe(res => {
      this.comments = this.comments.filter(c => c.id_comment !== this.toDelete);
      this.notificationService.notify('Deleted successfully!');
      this.closeModal();
    }, err => {
      this.error = err;
    });
  }

}
