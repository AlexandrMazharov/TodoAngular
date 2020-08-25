import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { TodoListService } from './shared/services/todoList/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pr2';
  constructor(public authService: AuthService) {}
}
