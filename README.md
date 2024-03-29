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

### 4.1. Loome uue todo loomise formi
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

### 4.5. Loome todo komponendi
1. Ava fail `src/app/todo/todo.component.ts`
2. Asenda import:
```typescript
import { Component, OnInit, Input } from '@angular/core';
```
3. **Klassi sees** lisa klassimuutuja:
```typescript
@Input() todoObj;
```
4. Ava fail `src/app/todo/todo.component.html`
5. Asenda HTML:
```html
<div class="todo">
 <p>Todo: {{ todoObj.body }}</p>
</div>
```

### 4.6. Lisame todo-le kustutamise ja tehtuks märkimise funktsionaalsused
1. Ava fail `src/app/todo-server.service.ts`
2. **Klassi sees** lisa kustutamise meetod:
```typescript
deleteTodo(todoObj) {
   this.todos = this.todos.filter(todo => todo.id !== todoObj.id);
   this.updateTodo.next();
}
```
3. **Klassi sees** lisa tehtuks märkimise meetod:
```typescript
switchTodoDoneFlag(todoObj) {
   this.todos.forEach(todo => {
     if (todo.id === todoObj.id) {
       todo.isDone = !todo.isDone;
     }
   });
   this.updateTodo.next();
}
```
4. Ava fail `src/app/todo/todo.component.ts`
5. Lisa import:
```typescript
import { TodoServerService } from '../todo-server.service';
```
6. **Klassi sees** uuenda konstruktori rida:
```typescript
constructor(private todoServer: TodoServerService) { }
```
7. **Klassi sees** lisa kustutamise meetod:
```typescript
removeTodo() {
   this.todoServer.deleteTodo(this.todoObj);
}
```
8. **Klassi sees** lisa tehtud märkimise meetod:
```typescript
switchDoneFlag() {
   this.todoServer.switchTodoDoneFlag(this.todoObj);
}
```
9. Ava fail `src/app/todo/todo.component.html`
10. Kirjuta üle terve fail järgnevaga:
```html
<div class="todo" [class.done-todo]="todoObj.isDone">
 <p>Todo: {{ todoObj.body }}</p>
 <button (click)="removeTodo()">Delete</button>
 <button (click)="switchDoneFlag()">Done</button>
</div>
```
11. Ava fail `src/app/todo/todo.component.css`
12. Lisa styling:
```css
.done-todo {
   background-color: lightgreen;
}
```

## 5. Paneme külge Materiali
### 5.1. Installeeri Material lokaalselt
1. Uues terminali aknas navigeeri `todo` kausta
2. Sisesta käsk: `npm install --save @angular/material @angular/cdk @angular/animations`

### 5.2. Lisame animatsioonid
1. Ava fail `src/app/app.module.ts`
2. Lisa import:
```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
```
3. Lisa NgModule decoratoris imports massiivi see BrowserAnimationsModule
```typescript
@NgModule({
  ...
  imports: [
    ...
    BrowserAnimationsModule
  ],
  ...
})
```

### 5.3. Teeme uue mooduli Materiali komponentide jaoks
1. Tee uus fail `src/app` kaustas nimega `material.module.ts`
2. Lisa sinna kood:
```typescript
import { NgModule } from "@angular/core";

@NgModule({
   imports: [],
   exports: []
})
export class MaterialModule {}
```
3. Ava uuesti fail `src/app/app.module.ts`
4. Lisa import:
```typescript
import { MaterialModule } from './material.module';
```
5. Lisa NgModule decoratoris imports massiivi see Material Module
```typescript
@NgModule({
  ...
  imports: [
    ...
    MaterialModule
  ],
  ...
})
```

### 5.4. Lisame Material pre-built theme-i
1. Ava fail `src/styles.css`
2. Lisa sinna rida:
```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

### 5.5. Lisame gesturite suppordi
1. Uues terminali aknas navigeeri `todo` kausta
2. Sisesta käsk: `npm install --save hammerjs`
3. Ava fail `src/main.ts`
4. Lisa import:
```typescript
import 'hammerjs';
```

### 5.6. Lisame faviconid
1. Ava fail `src/index.html`
2. Lisa `<head>` tagi rida:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

### 5.7. Testime kas Material läks külge
1. Ava fail `src/app/material.module.ts`
2. Lisa import
```typescript
import { MatButtonModule } from "@angular/material";
```
3. Muuda NgModule decoratorit:
```typescript
@NgModule({
  imports: [
     MatButtonModule
  ],
  exports: [
     MatButtonModule
  ]
})
```
4. Ava fail `src/app/create-todo/create-todo.component.html`
5. Asenda button element uuega:
```html
<button mat-raised-button color="primary" type="submit">Add Todo</button>
```
6. Kui nupp on nüüd sinist värvi on Material küljes

## 5.8. Lisame kõik Materiali komponendid mida läheb vaja
1. Ava fail `src/app/material.module.ts`
2. Kirjuta eelnev üle järgnevaga:
```typescript
import { NgModule } from "@angular/core";
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatListModule, MatChipsModule, MatSlideToggleModule } from "@angular/material";

@NgModule({
   imports: [
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatCardModule,
      MatListModule,
      MatChipsModule,
      MatSlideToggleModule
   ],
   exports: [
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatCardModule,
      MatListModule,
      MatChipsModule,
      MatSlideToggleModule
   ]
})
export class MaterialModule {}
```

## 6. Lisame Materiali komponendid Angulari projektile
### 6.1. Uue todo loomise formi komponendid
1. Ava fail `src/app/create-todo/create-todo.component.html`
2. `<form>` elemendi sisse tekita uus element `<mat-form-field>` ja pane vana `<input>` element sinna sisse:
```html
<mat-form-field>
   <input matInput type="text" name="todoText" placeholder="Write a todo" [(ngModel)]="value">
</mat-form-field>
```
3. Kindlasti lisa **matInput** attribute `<input>` elemendile
4. Selle `<input>` elemendi alla tekita uus element:
```html
<button mat-button mat-icon-button matSuffix type="button" *ngIf="value" (click)="value=''">
   <mat-icon>close</mat-icon>
</button>
```

### 6.2. Lisame formile datepickeri
#### 6.2.1. Datepickeri kood service-is
1. Ava fail `src/app/todo-server.service.ts`
2. Muuda funktsiooni:
```typescript
addTodo(todoText, todoDate?) {
 ...
 let date = todoDate ? todoDate.toDateString() : "";

 this.todos.push({
   ...
   date: date
 });
 ...
}
```
Ehk *`todoDate?`* on optional parameeter mille võtame vastu, loome uue *`let date = ...`* muutuja ning anname *`date: date`* objektile juurde


#### 6.2.2. Datepickeri kood Angulari komponendis
1. Ava fail `src/app/create-todo/create-todo.component.ts`
2. Lisa import:
```typescript
import { MatDatepickerInputEvent } from '@angular/material';
```
3. **Klassi sees** lisa klassimuutuja:
```typescript
todoDate;
```
4. **Klassi sees** lisa uus meetod:
```typescript
addDateEvent(event: MatDatepickerInputEvent<Date>) {
  this.todoDate = event.value;
}
```
5. **Klassi sees** muuda CreateNewTodo funktsiooni rida, sisuliselt lisa teine parameeter service-i funktsioonile (*this.todoDate*):
```typescript
this.todoServer.addTodo(formObj.value.todoText, this.todoDate);
```

#### 6.2.3. Datepickeri UI
1. Ava fail `src/app/create-todo/create-todo.component.html`
2. Asenda `<form>` elemendi rida uuega:
```html
<form (ngSubmit)="createNewTodo(formObj); value=''; date.value=''" #formObj="ngForm">
```
3. Eelmise `<mat-form-field>` elemendi alla lisa uus `<mat-form-field>`:
```html
<mat-form-field>

</mat-form-field>
```
4. Selle sisse kopeeri datepickeri elemendid:
```html
<input #date matInput [matDatepicker]="picker" placeholder="Deadline for a Todo" (dateInput)="addDateEvent($event)" (dateChange)="addDateEvent($event)">

<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
<mat-datepicker #picker></mat-datepicker>
```
#### 6.2.4. Styling tervele komponendile
1. Ava fail `src/app/create-todo/create-todo.component.css`
2. Lisa styling:
```css
.new-todo-container {
   width: 900px;
   margin: 0 auto 100px auto;
   text-align: center;
}

mat-form-field {
   width: 400px;
}
```

### 6.3. Todo list komponent
1. Ava fail `src/app/todo-list/todo-list.component.css`
2. Lisa styling:
```css
.todo-list-container {
    width: 900px;
    margin: 0 auto 100px auto;
}
h2 {
    text-align: center;
}
```

### 6.4. Todo komponent
1. Ava fail `src/app/todo/todo.component.html`
2. Asenda `<div>` elemendid `<mat-card>` elementidega:
```html
<mat-card class="todo" [class.done-todo]="todoObj.isDone">
  ...
</mat-card>
```
3. `<mat-card>` elemendi sisse tee uus element `<mat-list>` ja eelnev `<p>` element muuda `<mat-list-item>`-iks:
```html
<mat-list>
  <mat-list-item>Todo: {{ todoObj.body }}</mat-list-item>
</mat-list>
```
4. Pärast `<mat-list>` elementi tee uus element `<mat-card-actions>` ja tõsta `<button>` elemendid sinna sisse:
```html
<mat-card-actions>
  <button mat-button color="warn" (click)="removeTodo()">Delete</button>
  <button mat-button color="primary" (click)="switchDoneFlag()">Done</button>
</mat-card-actions>
```
5. `<mat-card-actions>` elemendi sisse lisa veel `<mat-chip-list>` element ja tõsta `<button>`-id sinna sisse:
```html
<mat-chip-list>
  <mat-chip disabled>{{ todoObj.date }}</mat-chip>
  
  <button mat-button color="warn" (click)="removeTodo()">Delete</button>
  <button mat-button color="primary" (click)="switchDoneFlag()">Done</button>
</mat-chip-list>
```
6. Asenda Done `<button>` slideriga:
```html
<mat-slide-toggle color="primary" (click)="switchDoneFlag()">{{ todoObj.isDone ? "Done" : "Not Done" }}</mat-slide-toggle>
```
7. Asenda Delete `<button>` icon buttoniga:
```html
<button mat-mini-fab color="warn" (click)="removeTodo()">
  <mat-icon>close</mat-icon>
</button>
```
8. Ava fail `src/app/todo/todo.component.css`
9. Lisa styling:
```css
mat-card {
    margin-bottom: 5px;
}
 mat-chip-list {
    outline: none;
}
 mat-slide-toggle {
    margin: 10px;
}
```








