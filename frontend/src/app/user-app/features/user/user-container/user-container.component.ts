import { Component, OnInit, ViewChild } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable, filter } from "rxjs";
import { UserDetails } from "src/app/user-app/core/models/user.model";
import { UserActions } from "src/app/user-app/core/states/user/user.action";
import { UserSelectors } from "src/app/user-app/core/states/user/user.selector";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ActivatedRoute, Router } from "@angular/router";
import { UserCreateFormComponent } from "../components/user-create-form/user-create-form.component";
import { ConfirmationService } from "primeng/api";

@UntilDestroy()
@Component({
    selector: "app-user-container",
    templateUrl: "./user-container.component.html",
    styleUrls: ["./user-container.component.scss"],
})
export class UserContainerComponent implements OnInit {
    @ViewChild(UserCreateFormComponent) userCreateFormComponent: UserCreateFormComponent;
    @Select(UserSelectors.getUsers) public items$: Observable<UserDetails[]>;

    public title = "Lista de Usuários";
    public items: UserDetails[] = [];
    public showCreateForm: boolean;
    public showUpdateForm: boolean;

    displayedColumns: string[] = ["name", "email", "cargo"];

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationService: ConfirmationService,

    ) {}

    ngOnInit(): void {
        this.route.queryParams
            .pipe(untilDestroyed(this))
            .subscribe((params) => {
                // usando o operador !! para transformar a expressão em booleano
                this.showUpdateForm = !!params.id;
                this.showCreateForm = !!params.create;
            });
        this.store.dispatch(new UserActions.GetAll());

        this.items$
            .pipe(untilDestroyed(this))
            .pipe(filter((p) => !!p))
            .subscribe((items: UserDetails[]) => {
                this.items = items;
            });
    }

    public onNew(): void {
        this.router.navigate([], { queryParams: { create: true }, replaceUrl: true });
      }


    public hideCreateModal(): void {
        this.userCreateFormComponent.createForm.reset();
        this.router.navigate([], { queryParams: {}, replaceUrl: true });
    }

    public hideUpdateModal(): void {
        this.router.navigate([], { queryParams: {}, replaceUrl: true });
    }


    public onDelete(user: UserDetails) {
        this.confirmationService.confirm({
          message: 'Tem certeza que gostaria de excluir esse registro: ' + user.name,
          accept: () => {
            this.store.dispatch(new UserActions.Remove(user.id));
            //this.store.dispatch(new UserActions.CreateLog("User Delete " + user.name, "Payload Vazio"))
          },
        });
    }
    public onUpdate(id: string) {
      this.router.navigate([], { queryParams: { id }, replaceUrl: true });
    }
}
