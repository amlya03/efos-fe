import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { LogsComponent } from './logs.component';
import { logsRoute } from './logs.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([logsRoute])],
  declarations: [LogsComponent],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class LogsModule {}
