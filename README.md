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
3. Lisa NgModule decoratorisse providers massivi see loodud TodoServerService
```typescript
@NgModule({
  ...
  providers: [
    TodoServerService
  ],
  ...
})
```

