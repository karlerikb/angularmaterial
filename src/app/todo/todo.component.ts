import { Component, OnInit, Input } from '@angular/core';
import { TodoServerService } from '../todo-server.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() todoObj;

  constructor(private todoServer: TodoServerService) { }

  ngOnInit() {
  }

  removeTodo() {
    this.todoServer.deleteTodo(this.todoObj);
  }
  switchDoneFlag() {
    this.todoServer.switchTodoDoneFlag(this.todoObj);
  }
}
