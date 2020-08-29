import { Component, OnInit, Input } from '@angular/core';
// import { LoginComponent } from 'src/app/admin/login/login.component';
import {
  FormGroup,
  // FormControl,
  FormBuilder,
  // Validators,
} from '@angular/forms';
import { Task } from 'src/app/shared/services/task';
import { TodoListService } from 'src/app/shared/services/todoList/todo-list.service';
// import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// import { from } from 'rxjs';
@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss'],
})
export class TaskListItemComponent implements OnInit {
  public _task: Task;
  // public titileDel;
  myForm: FormGroup;

  initForm() {
    this.myForm = this.fb.group({
      titleControl: {
        value: this._task.title,
        disabled: this._task.isСompleted,
      },
      complectedControl: [this._task.isСompleted],
      // btnSaveControl: ["X"],
    });
  }
  @Input()
  set item(task) {
    this._task = task;
  }
  DeleteItem() {
    // delete by database
    this.todoListService.DeleteItem(this._task);
  }
  UpdateItem() {
    //update task in database
    console.log(this._task.title);
    this.todoListService.UpdateItem(this._task);
  }

  updateCompleteTask(value: boolean) {
    //update conplecte task in database
    console.group('updateCompleteTask');
    this._task.isСompleted = value;
    this.UpdateItem();
    if (value === true) this.myForm.controls['titleControl'].disable();
    else this.myForm.controls['titleControl'].enable();
    console.groupEnd();
  }
  constructor(
    public todoListService: TodoListService,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initForm();
    //subscribing to a task
    this.myForm.controls['complectedControl'].valueChanges.subscribe((value) =>
      this.updateCompleteTask(value)
    );
    //subscribe to change the text field
    this.myForm.controls['titleControl'].valueChanges.subscribe((value) => {
      this._task.title = value;
      this.UpdateItem();
    });
  }
}
