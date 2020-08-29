import { Injectable } from '@angular/core';

// import { AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase';

import { Task } from '../task';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
// import { sortedChanges } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class TodoListService {
  public isLoad: boolean;
  public size: number;
  public todoList ;
  public userID: string;
  public sortList;

  constructor(public router: Router, public afAuth: AngularFireAuth) {
    this.isLoad = false;
    this.getAll = this.getAll.bind(this);
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userID = user.uid;
        this.getAll().then(() => (this.isLoad = this.isLoad!));
      }
    });
  }  
  SortByDate(arr) {
    let resultArr = new Map([]);
    console.group('SortByDate');
    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
      if (resultArr.has(arr[i].dt)) {
        let old;
        old = resultArr.get(arr[i].dt);
        old.push(arr[i]);
        // console.log(old);
        resultArr.set(arr[i].dt, old);
      } else {
        resultArr.set(arr[i].dt, [arr[i]]);
      }
    }
    // console.log('resultArr');
    this.sortList = resultArr;
    console.log(this.sortList);
    console.groupEnd;
  }
  resultContainsDate(resultArr, date) {
    // rerurn date or -1 if date not found
    if (resultArr.has(date) == date) {
      console.log(date);
      return date;
    }
    return -1;
  }
  
  public AddItem(date): void {
    // add empty task on datebase
    console.group('AddItem');
    console.log(date);
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    this.size++;
    console.log(this.size.toString());
    let newItem = new Task('', this.size, date.toISOString());
    firebase.database().ref(uid).child(this.size.toString()).set(newItem);
    // console.log(newItem);
    console.groupEnd();
  }
  public DeleteItem(task: Task) {
    let uid = this.userID;
    firebase.database().ref(uid).child(task.id.toString()).remove();
    this.getAll();
  }
  public UpdateItem(task: Task) {
    return firebase
      .database()
      .ref(this.userID)
      .child(task.id.toString())
      .update(task);
  }

  getAllOk(snapshot) {
    if (snapshot.val() != null) {
      let arr = snapshot
        .val()
        .filter((value) => JSON.stringify(value) !== '{}');
      this.todoList = arr;
      this.size = arr[arr.length - 1].id;
      this.SortByDate(arr);
    } else {
      this.size = 0;
    }
    this.isLoad = true;
  }

  public getAll() {
    console.log('todo-list-servise: getAll');

    let userId = this.userID;
    return firebase
      .database()
      .ref(userId)
      .once('value')
      .then(
        (snapshot) => {
          this.getAllOk(snapshot);
        },
        (error) => new Error('error' + error)
      );
  }
}
