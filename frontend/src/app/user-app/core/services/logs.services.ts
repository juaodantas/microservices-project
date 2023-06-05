import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LogCreate, LogsDetails } from "../models/logs.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class LogService {
    private endpoint = environment.apiLogs;
    private controller = 'log';

    constructor(private http: HttpClient) { }

    public getLogs(): Observable<LogsDetails[]> {
      return this.http.get<LogsDetails[]>(`${this.endpoint}/${this.controller}`);
    }

    public create(log: LogCreate): Observable<LogsDetails> {
        return this.http.post<LogsDetails>(`${this.endpoint}/${this.controller}`, log);
    }
  }
