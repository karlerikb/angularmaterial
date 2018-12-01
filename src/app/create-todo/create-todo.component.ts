import { Component, OnInit } from '@angular/core';
import { TodoServerService } from '../todo-server.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  constructor(private todoServer: TodoServerService) { }

  ngOnInit() {
  }

  createNewTodo(formObj) {
    if (formObj.value.todoText) {
      this.todoServer.addTodos(formObj.value.todoText);
    }
  }

}
