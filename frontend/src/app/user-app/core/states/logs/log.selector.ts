import { Selector } from "@ngxs/store";
import { LogStateModel, LogsState } from "./log.store";
import { LogsDetails } from "../../models/logs.model";
import { cloneDeep } from 'lodash-es';

export class LogSelectors {
    @Selector([LogsState])
    public static getLogs(state: LogStateModel): LogsDetails[] {
      return cloneDeep(state.items) as LogsDetails[];
    }
  }

