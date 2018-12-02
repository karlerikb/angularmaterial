import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServerService {

  private todo = [];
  updateTodo = new Subject();

  constructor() { }


  addTodo(todoText) {

    let id = Math.floor((Math.random()*100000)+1);

    this.todo.push({
      id: id,
      body: todoText,
      isDone: false
    });

    console.log(this.todo);

    this.updateTodo.next();
  }


  getTodo() {
    return [...this.todo];
  }

  deleteTodo(todoObj) {
    console.log(todoObj);
    this.todo = this.todo.filter(todo => todo.id !== todoObj.id);
    this.updatedTodo.next();
  }
}
