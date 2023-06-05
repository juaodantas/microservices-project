import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { LogsDetailsComponent } from './components/logs-details/logs-details.component';
import { LogContainerComponent } from './log-container/log-container.component';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LogContainerComponent, LogsDetailsComponent],
  imports: [
    CommonModule,
    TimelineModule,
    DialogModule,
    CardModule,
    ButtonModule,
  ],
  providers: [
    DatePipe
  ]
})
export class LogsModule { }
