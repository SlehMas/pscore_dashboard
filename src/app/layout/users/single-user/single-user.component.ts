import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  id: any;
  user: any;
  assignTeacherError = false;
  students: any[] = [];
  teachers: any[] = [];
  newTeachers: any[] = [];
  toRemove = -1;
  isAddTeacher = false;
  isSubmitted = false;
  userForm: FormGroup;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router) {
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
      });
      if (this.id) {
        this.userService.getUser(this.id).subscribe(data => {
          this.user = data;
          this.userForm = new FormGroup({
            username: new FormControl(this.user.username_user),
            email: new FormControl(this.user.email_user),
            firstname: new FormControl(this.user.firstname_user),
            lastname: new FormControl(this.user.lastname_user),
            phone: new FormControl(this.user.phone_user)
          });

          if (this.user && this.user.status_user === 'student') {
            this.userService.getTeachersByStudentsId(this.id).subscribe(teachersRes => {
              this.teachers = teachersRes;
              console.log('hi', this.teachers);
            });
          }

          if (this.user && this.user.status_user === 'teacher') {
            this.userService.getStudentsByTeacherId(this.id).subscribe(studentRes => {
              this.students = studentRes;
              console.log('hi', this.students);
            });
          }
        });
      }
   }

  ngOnInit(): void {
  }
  get f() {
    return this.userForm.controls;
  }

  submit () {
    this.isSubmitted = true;
    if (this.userForm.invalid) {
      this.isSubmitted = false;
      return;
    }

    if (this.id) {
      this.userService.updateUser({
        id_user: this.id,
        firstname_user: this.f.firstname.value,
        lastname_user: this.f.lastname.value,
        phone_user: this.f.phone.value
      }).subscribe(res => {
        this.router.navigateByUrl('/users');
        this.notificationService.notify('Updated successfully!');
        this.isSubmitted = false;
      }, err => {
        this.notificationService.notify('An error occured while trying to update, please try again later');
        this.isSubmitted = false;
      });
      return;
    }
  }
  deleteTeacher () {
    this.userService.removeTeacher(this.id, this.toRemove).subscribe(res => {
      this.teachers.splice(
        this.teachers.findIndex(t => t.id_user === this.toRemove),
        1
      );
      this.closeDeleteTeacherModal();
    });
  }

  assignTeacher (teacher) {
    this.isAddTeacher = true;
    this.userService.assignTeacher(this.id, teacher.id_user).subscribe(res =>{
      this.notificationService.notify('Successfully assigned.');
      this.teachers.unshift(teacher);
      this.isAddTeacher = false;
      this.closeTeacherModal();
      this.newTeachers = [];
    }, err => {
      this.assignTeacherError = true;
      this.isAddTeacher = false;
    });
  }
  showDeleteTeacherModal (teacherId) {
    this.toRemove = teacherId;
    console.log(this.toRemove)
    document.getElementById('deleteTeacherModal').style.display = 'block';
    document.getElementById('deleteTeacherModal').style.backgroundColor = 'rgba(0,0,0,0.56)';
  }
  closeDeleteTeacherModal () {
    this.toRemove = -1;
    document.getElementById('deleteTeacherModal').style.display = 'none';
  }
  showTeacherModal () {
    document.getElementById('addTeacherModal').style.display = 'block';
    document.getElementById('addTeacherModal').style.backgroundColor = 'rgba(0,0,0,0.56)';
    this.userService.getTeachersThatAreNotMine(this.id).subscribe(data => {
      this.newTeachers = data;
    });
  }
  closeTeacherModal () {
    this.assignTeacherError = false;
    document.getElementById('addTeacherModal').style.display = 'none';
  }
}
