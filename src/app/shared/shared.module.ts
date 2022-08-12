import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder.directive';
import { NgModule } from '@angular/core';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
})
export class SharedModule {}
