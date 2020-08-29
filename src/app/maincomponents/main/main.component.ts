import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/app/shared/services/todoList/todo-list.service';
import { BrowserModule } from '@angular/platform-browser';
// import { MaterialModule } from './material/material/material.module';
import { MatCalendar } from '@angular/material/datepicker';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  // https://onthecode.co.uk/angular-material-calendar-component/
  selectedDateISO;
  selectedDate;

  dateOnDispaly;

  dateChanged($event) {
    this.selectedDateISO = this.selectedDate.toISOString();
    console.log(this.selectedDateISO);
    this.getCurrentDate(this.selectedDate);
  }
  getCurrentDate(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    this.dateOnDispaly = d + '.' + m + '.' + y;
  }

  AddEmptyTask() {
    console.log('AddEmptyTask');
    console.log(this.selectedDate);

    this.todolist.AddItem(this.selectedDate);
    this.ngOnInit();
    this.todolist.getAll();
  }

  constructor(public todolist: TodoListService) {
    this.getCurrentDate(new Date());
  }

  ngOnInit(): void {}
}
