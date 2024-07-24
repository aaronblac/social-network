import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public userService:UserService, private router: Router) { }

  ngOnInit(): void {
    if(this.userService.user == undefined || this.userService.user == null){
      let str = localStorage.getItem('user');
      if(str!= null){
        this.userService.user = JSON.parse(str);
      }
      else{
        this.router.navigate(['/login']);//redirects to login if not logged in
      }
    }
  }

  post(){
    id:"id"
  }

  comment(){

  }

  like(){

  }
}
