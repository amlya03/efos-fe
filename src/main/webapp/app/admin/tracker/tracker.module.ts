import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { TrackerComponent } from './tracker.component';
import { trackerRoute } from './tracker.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([trackerRoute])],
  declarations: [TrackerComponent],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TrackerModule {}
