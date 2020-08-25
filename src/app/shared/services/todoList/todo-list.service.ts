import { Injectable } from '@angular/core';

import { AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase';

import { Task } from '../task';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class TodoListService {
  public isLoad;
  public size: number;
  public todoList;
  public userID;

  constructor(public router: Router, public afAuth: AngularFireAuth) {
    this.isLoad = false;
    this.getAll = this.getAll.bind(this);
    // как только получаем пользоватлея, делаем запрос в базу
    this.afAuth.authState.subscribe((user) => {
      this.userID = user.uid;
      this.getAll().then(() => (this.isLoad = this.isLoad!));
    });
  }

  public AddItem(): void {
    console.group('AddItem');
    console.log('uid: ' + JSON.parse(localStorage.getItem('user')).uid);
    console.groupEnd();
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    this.size++;
    console.log(this.size);

    console.log(this.size.toString());

    let newItem = new Task('', this.size);
    firebase.database().ref(uid).child(this.size.toString()).set(newItem);
  }
  public DeleteItem(task: Task) {
    let uid = this.userID;
    firebase.database().ref(uid).child(task.id.toString()).remove();
    this.getAll();
  }
  public UpdateItem(task: Task) {
    let uid = this.userID;
    var newPostKey = firebase
      .database()
      .ref(uid)
      .child(this.size.toString())
      .push().key;
    return firebase.database().ref(uid).child(task.id.toString()).update(task);
  }

  getAllOk(snapshot) {
    if (snapshot.val() != null) {
      let arr = snapshot
        .val()
        .filter((value) => JSON.stringify(value) !== '{}');
      this.todoList = arr;
      let s = arr[arr.length - 1].id;
      this.size = s;
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
