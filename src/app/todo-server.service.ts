import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServerService {

  private todos = [];
  updateTodo = new Subject();

  constructor() { }


  addTodo(todoText) {

    let id = Math.floor((Math.random()*100000)+1);

    this.todos.push({
      id: id,
      body: todoText,
      isDone: false
    });

    console.log(this.todos);

    this.updateTodo.next();
  }


  getTodos() {
    return [...this.todos];
  }

  deleteTodo(todoObj) {
    //console.log(todoObj);
    this.todos = this.todos.filter(todo => todo.id !== todoObj.id);
    this.updateTodo.next();
  }

  switchTodoDoneFlag(todoObj) {
    this.todos.forEach(todo => {
      if (todo.id === todoObj.id) {
        todo.isDone = !todo.isDone;
      }
    });
    this.updateTodo.next();
  }
}
