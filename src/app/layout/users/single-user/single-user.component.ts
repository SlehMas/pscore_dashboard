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
            username: new FormControl(this.user.username),
            email: new FormControl(this.user.email),
            firstname: new FormControl(this.user.firstname),
            lastname: new FormControl(this.user.lastname),
            phone: new FormControl(this.user.phone)
          });

          if (this.user && this.user.status === 'student') {
            this.userService.getTeachersByStudentsId(this.id).subscribe(teachersRes => {
              this.teachers = teachersRes;
              console.log('hi', this.teachers);
            });
          }

          if (this.user && this.user.status === 'teacher') {
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
        id: this.id,
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        phone: this.f.phone.value
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

  assignTeacher (teacher) {
    this.isAddTeacher = true;
    this.userService.assignTeacher(this.id, teacher.id).subscribe(res =>{
      this.notificationService.notify('Successfully assigned.');
      this.teachers.unshift(teacher)
      this.isAddTeacher = false;
      this.closeTeacherModal();
      this.newTeachers = [];
    }, err => {
      this.assignTeacherError = true;
      this.isAddTeacher = false;
    })
  }
  showModal () {
    document.getElementById('addTeacherModal').style.display = 'block';
    document.getElementById('addTeacherModal').style.backgroundColor = 'rgba(0,0,0,0.56)';
    this.userService.getTeachersThatAreNotMine(this.id).subscribe(data => {
      this.newTeachers = data;
      console.log(this.newTeachers);
    });
  }
  closeTeacherModal () {
    this.assignTeacherError = false;
    document.getElementById('addTeacherModal').style.display = 'none';
  }
}
