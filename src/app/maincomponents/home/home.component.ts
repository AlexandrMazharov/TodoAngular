//про авторизацию
//https://www.positronx.io/full-angular-7-firebase-authentication-system/#tc_784_06
import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../../shared/services/todoList/todo-list.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //  public todoService: TodoListService;
  // userid;
  constructor(
    public authService: AuthService,
    public todoService: TodoListService
  ) {
    // console.log('Авторизация : ' + authService.isLoggedIn);
    // if (authService.isLoggedIn) {
    //   this.userid = 'logined';
    // } else {
    //   this.userid = 'notlogined';
    // }
  }


  ngOnInit(): void {}
}
