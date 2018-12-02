import { NgModule } from "@angular/core";
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatListModule, MatChipsModule } from "@angular/material";

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
      MatChipsModule
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
      MatChipsModule
   ]
})
export class MaterialModule {}