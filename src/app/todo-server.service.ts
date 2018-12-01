import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServerService {

  private todos = [];
  updateTodo = new Subject();

  constructor() { }


  addTodos(todoText) {

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

  
}
