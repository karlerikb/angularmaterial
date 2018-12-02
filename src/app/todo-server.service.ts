import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServerService {

  private todos = [];
  updateTodo = new Subject();

  constructor() { }


  addTodo(todoText, todoDate?) {

    let id = Math.floor((Math.random()*100000)+1);
    let date = todoDate ? todoDate.toDateString() : "";

    this.todos.push({
      id: id,
      body: todoText,
      isDone: false,
      date: date
    });

    console.log(this.todos);

    this.updateTodo.next();
  }


  getTodos() {
    return [...this.todos];
  }

  deleteTodo(todoObj) {
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
