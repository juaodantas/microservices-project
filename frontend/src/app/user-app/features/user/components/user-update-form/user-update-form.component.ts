import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Select, Store } from "@ngxs/store";
import { Observable, filter } from "rxjs";
import {
    UserDetails,
    UserUpdate,
} from "src/app/user-app/core/models/user.model";
import { UserActions } from "src/app/user-app/core/states/user/user.action";
import { UserSelectors } from "src/app/user-app/core/states/user/user.selector";

@UntilDestroy()
@Component({
    selector: "app-user-update-form",
    templateUrl: "./user-update-form.component.html",
    styleUrls: ["./user-update-form.component.scss"],
})
export class UserUpdateFormComponent implements OnInit {
    @Select(UserSelectors.currentUser)
    public currentUser$: Observable<UserDetails>;

    public updateForm: FormGroup;

    private currentUser: UserDetails;

    constructor(
        private FormBuilder: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.setupForm();

        this.route.queryParams
            .pipe(untilDestroyed(this))
            .subscribe((params) => {
                if (params.id) {
                    this.store.dispatch(new UserActions.LoadSingle(params.id));
                }
            });

        this.currentUser$
            .pipe(untilDestroyed(this))
            .pipe(filter((p) => !!p))
            .subscribe((user: UserDetails) => {
                this.currentUser = user;
                this.updateForm.patchValue({
                    senhaControl: user.senha,
                    cargoControl: user.cargo,
                    emailControl: user.email,
                    nameControl: user.name,
                });
            });
    }

    /**
     * Metodo para enviar informações para update do usuario
     */
    public onSubmit() {
        const userUpdate: UserUpdate = {
            name: this.updateForm.get("nameControl").value,
            senha: this.updateForm.get("senhaControl").value,
            email: this.updateForm.get("emailControl").value,
            cargo: this.updateForm.get("cargoControl").value,
        };

/*         this.store.dispatch(
            new UserActions.CreateLog(
                "User Update " + userUpdate.name,
                JSON.stringify(userUpdate)
            )
        ); */

        this.store
            .dispatch(new UserActions.Update(this.currentUser.id, userUpdate))
            .subscribe({
                next: () => {
                    this.router.navigate([], {
                        queryParams: {},
                        replaceUrl: true,
                    });
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }

    /**
     * Inicia o formulario para update de usuario
     */
    private setupForm() {
        this.updateForm = this.FormBuilder.group({
            nameControl: new FormControl("", [
                Validators.required,
                Validators.minLength(3),
            ]),
            emailControl: new FormControl("", [
                Validators.required,
                Validators.minLength(3),
            ]),
            cargoControl: new FormControl("", [
                Validators.required,
                Validators.minLength(3),
            ]),
            senhaControl: new FormControl("", [
                Validators.required,
                Validators.minLength(3),
            ]),
        });
    }
}
