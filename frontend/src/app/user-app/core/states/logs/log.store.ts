import { Action, State, StateContext, Store } from "@ngxs/store";
import { LogsDetails } from "../../models/logs.model";
import { Injectable } from "@angular/core";
import { LogService } from "../../services/logs.services";
import { LogActions } from "./log.action";
import { cloneDeep } from 'lodash-es';
import { tap } from "rxjs";

export class LogStateModel {
    public items: LogsDetails[] = [];
  }

  @State<LogStateModel>({
    name: 'log',
    defaults: {
      items: []
    }
  })

  @Injectable()
  export class LogsState {
    constructor(private store: Store, private logService: LogService) { }

    @Action(LogActions.GetAll)
    getAllLogs(
      { patchState }: StateContext<LogStateModel>) {
      return this.logService.getLogs().pipe(
        tap((logs: LogsDetails[]) => {
          patchState({
            items: cloneDeep(logs),
        });
        })
      );
    }

  }
