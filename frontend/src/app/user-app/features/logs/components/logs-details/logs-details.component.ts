import { Component, Input, OnInit } from '@angular/core';
import { LogsView } from 'src/app/user-app/core/models/logs.model';

@Component({
  selector: 'app-logs-details',
  templateUrl: './logs-details.component.html',
  styleUrls: ['./logs-details.component.scss']
})
export class LogsDetailsComponent implements OnInit {
  @Input() log: LogsView;
  public data: string;
  public hora: string;


  constructor() { }

  ngOnInit(): void {
  }

}
