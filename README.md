# Angular Material todo rakenduse installerimisjuhis

Enne Angulari installeerimist peaks olema installitud [nodejs](https://nodejs.org/en/)


## 1. Esmane installeerimine

* Installeeri [Angular CLI](https://cli.angular.io/) globaalselt käsuga terminalis `npm install -g @angular/cli` 


## 2. Tee uus Angulari projekt

1. Mine terminaliga mingisse folderisse kuhu soovid Angulari projekti teha
2. Tekita uus projekt käsuga `ng new todo` (see käsk promptib kahte küsimust, mõlemale võib vajutada enter, ehk valida default seaded)
3. Mine projekti kausta `cd todo`
4. Käivita Angulari projekt `ng serve`

## 3. Tekita komponendid ja service

1. Ava uus terminali aken ja navigeeri projekti folderisse (`todo` folder)
2. `ng generate component create-todo`
3. `ng generate component todo-list`
4. `ng generate component todo`
5. `ng generate service todo-server`

Lisaks tuleb manuaalselt registreerida viimase käsuga loodud service
1. Ava fail `src/app/app.module.ts`
2. Lisa rida:
```typescript
import { TodoServerService } from './todo-server.service';
```
3. Lisa NgModule decoratorisse providers massivi see loodud TodoServerService:
```typescript
@NgModule({
  ...
  providers: [
    TodoServerService
  ],
  ...
})
```

## 4. Loome todo rakenduse funktsionaalsuse

1. Ava fail `src/app/app.component.html`
2. Kustuta seal olev HTML ja lisa uus:
```html
<app-create-todo></app-create-todo>
<app-todo-list></app-todo-list>
```

### 4.1 Loome uue todo loomise formi
1. Ava fail `src/app/app.module.ts`
2. Lisa rida:
```typescript
import { FormsModule } from '@angular/forms';
```
3. Lisa NgModule decoratorisse imports massiivi see FormsModule
```typescript
@NgModule({
  ...
  imports: [
    FormsModule,
    ...
  ],
  ...
})
```
4. Ava fail `src/app/create-todo/create-todo.component.ts`
5. Lisa sinna faili **klassi sisse**:
```typescript
createNewTodo(formObj) {
   console.log(formObj.value.todoText);
}
```
5. Ava fail `src/app/create-todo/create-todo.component.html`
6. Kirjuta üle seal olev järgnevaga:
```html
<div class="new-todo-container">
  <h1>Create a Todo!</h1>

  <form (ngSubmit)="createNewTodo(formObj); value=''" #formObj="ngForm">
    <input type="text" name="todoText" placeholder="Write a todo" [(ngModel)]="value">
    
    <button type="submit">Add Todo</button>
  </form>
</div>
```

### 4.2. Loome service-i todo-de loomise ja kuvamise funktsioonid

1. Ava fail `src/app/todo-server.service.ts`
2. Lisa impordi rida:
```typescript
import { Subject } from 'rxjs';
```
3. **Klassi sisse** lisa klassimuutujad:
```typescript
private todos = [];
updateTodo = new Subject();
```
4. **Klassi sisse** lisa meetod, mis lisab todo-d massiivi
```typescript
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
```
5. **Klassi sisse** lisa meetod, mis kuvab kõik todo-d
```typescript
getTodos() {
   return [...this.todos];
}
```

### 4.3. Uuendame create-todo komponenti lisades külge service-i
1. Ava fail `src/app/create-todo/create-todo.component.ts`
2. Lisa service-i import:
```typescript
import { TodoServerService } from '../todo-server.service';
```
3. Uuenda konstruktori rida:
```typescript
constructor(private todoServer: TodoServerService) { }
```
4. Uuenda (asenda) createNewTodo funktsioon:
```typescript
createNewTodo(formObj) {
   if (formObj.value.todoText) {
     this.todoServer.addTodos(formObj.value.todoText);
   }
 }
```

### 4.4. Loome todo-list komponendi
1. Ava fail `src/app/todo-list/todo-list.component.ts`
2. Lisa (asenda) impordid:
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoServerService } from '../todo-server.service';
```
3. Klassi defineerimisel lisa implements OnDestroy:
```typescript
export class TodoListComponent implements OnInit, OnDestroy {
...
}
```
4. **Klassi sees** lisa klassimuutujad:
```typescript
private todoSubscription = new Subscription();
todos;
```
5. **Klassi sees** uuenda konstruktori rida:
```typescript
constructor(private todoServer: TodoServerService) { }
```
6. **Klassi sees** muuda ngOnInit meetodit:
```typescript
ngOnInit() {
   this.todos = this.todoServer.getTodos();
  
   this.todoSubscription = this.todoServer.updateTodo.subscribe( () => {
     this.todos = this.todoServer.getTodos();
   });
}
```
7. **Klassi sees** lisa ngOnDestroy meetod:
```typescript
ngOnDestroy() {
  this.todoSubscription.unsubscribe();
}
```
8. Ava fail `src/app/todo-list/todo-list.component.html`
9. Asenda sealne HTML:
```html
<div class="todo-list-container">
  <h2>A List of Todos!</h2>

  <app-todo *ngFor="let todo of todos" [todoObj]="todo"></app-todo>
</div>
```
















