import { Component, OnInit, Input } from '@angular/core';
import { LoginComponent } from 'src/app/admin/login/login.component';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Task } from 'src/app/shared/services/task';
import { TodoListService } from 'src/app/shared/services/todoList/todo-list.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { from } from 'rxjs';
@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss'],
})
export class TaskListItemComponent implements OnInit {
  public _task: Task;
  public titileDel;
  myForm: FormGroup;

  initForm() {
    this.myForm = this.fb.group({
      titleControl: {
        value: this._task.title,
        disabled: this._task.isСompleted,
      },
      complectedControl: [this._task.isСompleted],
      btnSaveControl: ["X"],
    });
  }
  @Input()
  set item(task) {
    this._task = task;
  }
  DeleteItem() {
    // удаляется с базы, но никак не удаляется с интерфейса
    this.todoListService.DeleteItem(this._task);
  }
  UpdateItem() {
    console.log(this._task.title);

    this.todoListService.UpdateItem(this._task);
  }
  //при изменении чекбокса обновляем на сервере задачу
  updateCompleteTask(value: boolean) {
    console.group('updateCompleteTask');

    console.log('было:' + this._task.isСompleted);
    console.log('ставим:' + value);

    this._task.isСompleted = value;
    this.UpdateItem();
    if (value === true) this.myForm.controls['titleControl'].disable();
    else this.myForm.controls['titleControl'].enable();
  }
  constructor(
    public todoListService: TodoListService,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {
    
    // this.translateService.get(['delTask']).subscribe((translations) => {
    //   this.titileDel = translations['delTask'];
    // });
  }

  ngOnInit(): void {
    this.initForm();
    //подписка на изменение чекбокса
    this.myForm.controls['complectedControl'].valueChanges.subscribe((value) =>
      this.updateCompleteTask(value)
    );
    //подписка на изменение текст поля
    this.myForm.controls['titleControl'].valueChanges.subscribe((value) => {
      this._task.title = value;
      this.UpdateItem();
    });
  }
}
