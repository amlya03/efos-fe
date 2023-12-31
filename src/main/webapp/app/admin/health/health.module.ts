import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { HealthComponent } from './health.component';
import { HealthModalComponent } from './modal/health-modal.component';
import { healthRoute } from './health.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([healthRoute])],
  declarations: [HealthComponent, HealthModalComponent],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HealthModule {}
