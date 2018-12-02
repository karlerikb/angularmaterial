import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoServerService } from '../todo-server.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  private todoSubscription = new Subscription();
  todos;

  constructor(private todoServer: TodoServerService) { }

  ngOnInit() {
    this.todo = this.todoServer.getTodo();
    
    this.todoSubscription = this.todoServer.updateTodo.subscribe( () => {
      this.todo = this.todoServer.getTodo();
    });
  }

}
