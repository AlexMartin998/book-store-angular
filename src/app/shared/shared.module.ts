import { NgModule } from '@angular/core';

import { InputErrorDirective } from './directives/input-error.directive';
import { SafeImagePipe } from './pipes/safe-image.pipe';

@NgModule({
  declarations: [InputErrorDirective, SafeImagePipe],
  exports: [InputErrorDirective, SafeImagePipe],
})
export class SharedModule {}
