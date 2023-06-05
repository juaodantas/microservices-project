import { DatePipe, formatDate } from "@angular/common";
import { LogsDetails, LogsView } from "./../../../core/models/logs.model";
import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Select, Store } from "@ngxs/store";
import { Observable, filter } from "rxjs";
import { LogActions } from "src/app/user-app/core/states/logs/log.action";
import { LogSelectors } from "src/app/user-app/core/states/logs/log.selector";

@UntilDestroy()
@Component({
    selector: "app-log-container",
    templateUrl: "./log-container.component.html",
    styleUrls: ["./log-container.component.scss"],
})
export class LogContainerComponent implements OnInit {
    @Select(LogSelectors.getLogs) public items$: Observable<LogsDetails[]>;
    public items: LogsDetails[] = [];
    public logAtual: LogsView;
    public showDetails: boolean = false;

    constructor(private store: Store, private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.store.dispatch(new LogActions.GetAll());

        this.items$
            .pipe(untilDestroyed(this))
            .pipe(filter((p) => !!p))
            .subscribe((items: LogsDetails[]) => {
                this.items = items;
            });
    }

    /**
     * Recebe um LogDetails e trnasforma em um LogsView
     * Metodo criado para formatar data e hora do log
     * @param log LogsDetails
     * @returns LogsView
     */
    public logDetailsToLogView(log: LogsDetails): LogsView {
        const datalog = formatDate(log.timestamp, "dd/MM/yyyy", "en");
        const horalog = formatDate(log.timestamp, "HH:mm:ss", "en");

        return {
            payload: log.payload,
            action: log.action,
            data: datalog,
            hora: horalog,
        };
    }

    /**
     * Abrir o modal de Detalhes do log
     * @param logsDetails
     */
    public openDetails(logsDetails: LogsDetails) {
        this.logAtual = this.logDetailsToLogView(logsDetails);
        this.showDetails = true;
    }
}
