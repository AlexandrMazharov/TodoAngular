import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/app/shared/services/todoList/todo-list.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {  
  AddEmptyTask() {
    console.log('AddEmptyTask');
    this.todolist.AddItem();
    this.ngOnInit();
    this.todolist.getAll();
  }

  constructor(public todolist: TodoListService) {
  
  }

  ngOnInit(): void {}
}
