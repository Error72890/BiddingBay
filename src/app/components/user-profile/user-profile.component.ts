import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';

interface User {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  adress: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
  

export class UserProfileComponent {

  userInfo: User = {
    userId: 0,
    fullName: '',
    email: '',
    phoneNumber: '',
    adress: ''
    };
  userId: number | undefined;

  constructor(private userService: UserService, private router: Router) { 

  }

  ngOnInit() {
    this.checkSession();
    this.getUserById();
  }

  checkSession() {
    const storedId = localStorage.getItem('userId');
    if (!storedId) {
      this.router.navigate(['/login']); 
    }
    else {
      this.userId = parseInt(storedId);
    }
  }
  getUserById() {
    this.userService.getUserById(this.userId!).subscribe((response) => {
      this.userInfo = response.user;
      
    });
  }
}

