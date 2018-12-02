import { NgModule } from "@angular/core";
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule } from "@angular/material";

@NgModule({
   imports: [
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule
   ],
   exports: [
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule
   ]
})
export class MaterialModule {}