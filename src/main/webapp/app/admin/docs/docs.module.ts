import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { DocsComponent } from './docs.component';
import { docsRoute } from './docs.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([docsRoute])],
  declarations: [DocsComponent],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DocsModule {}
