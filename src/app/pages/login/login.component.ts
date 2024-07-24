import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, public userService: UserService, private snackbar: MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  //This is a form group created for login
  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],//Validators mark them as required, require email
    password: ['', [Validators.required, Validators.minLength(6)]]//required, and min length of pswrd is 6
  })

  login(){
    this.userService.getUser(this.loginForm.value.email).then((res:any)=>{
      console.log(res);
      if(res.length ==0){
        this.snackbar.open('Account does not exist');
        console.log("User does not exist");
      } else {
        if(res[0].password == this.loginForm.value.password){
          this.snackbar.open('Login Successful', 'ok');
          this.userService.user = res[0];
          localStorage.setItem('user',JSON.stringify(res[0]));
          this.router.navigate(['/posts']);
          console.log("Password Matched");
        }else{
          this.snackbar.open('Incorrect Password');
          console.log("Incorrect Password")
        }
      }
    }).catch((err)=>{
      console.log(err);
    });
  };

}
