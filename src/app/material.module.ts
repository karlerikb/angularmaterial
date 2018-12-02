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