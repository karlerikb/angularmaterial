import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { TodoServerService } from './todo-server.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateTodoComponent,
    TodoListComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    TodoServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
