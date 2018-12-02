import { Component, OnInit } from '@angular/core';
import { TodoServerService } from '../todo-server.service';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  todoDate;

  constructor(private todoServer: TodoServerService) { }

  ngOnInit() {
  }

  createNewTodo(formObj) {
    if (formObj.value.todoText) {
      this.todoServer.addTodo(formObj.value.todoText, this.todoDate);
    }
  }

  addDateEvent(event: MatDatepickerInputEvent<Date>) {
    this.todoDate = event.value;
  }

}
