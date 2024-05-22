import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  providers: [SessionGuard]
})
export class AuthenticationComponent implements OnInit {
  showLoginForm = true;

  userDataFormItem!: FormGroup;
  userData: any = {};
  invalidData = false;

  newUserDataFormItem!: FormGroup;
  newUserData: any = {};

  constructor(private router: Router, private userService: UserService) { }

  /**
   * Elimina las llaves de acceso al iniciar.
   */
  ngOnInit() {

    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    this.userDataFormItem = new FormGroup({
      email: new FormControl(this.userData.email, [Validators.required]),
      password: new FormControl(this.userData.password, Validators.required),
    });
  }

  changeMode(toLogin: boolean){
    if(toLogin){
      this.showLoginForm = true;
    }
    else{
      this.showLoginForm = false;
    }
  }
  
  /**
   * Función de login.
   */
  async login() {
    const { email, password } = this.userData;

    this.userService.login(email, password).subscribe(
      async (response: any) => {
        if (response.ok == true) {
          const userId = response.userId;
          const token = response.token;
          const userName = response.userName;

          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          localStorage.setItem('token', token);

          this.router.navigate(['/home']);
        } else if (response.ok == false) {
          this.invalidData = true;
        }
      }

    );

  }
}

