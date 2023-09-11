import { NgModule } from '@angular/core';

import { InputErrorDirective } from './directives/input-error.directive';

@NgModule({
  declarations: [InputErrorDirective],
  exports: [InputErrorDirective],
})
export class SharedModule {}
