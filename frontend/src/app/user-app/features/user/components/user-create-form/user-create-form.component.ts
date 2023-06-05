import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import { UserCreate } from "src/app/user-app/core/models/user.model";
import { UserActions } from "src/app/user-app/core/states/user/user.action";

@UntilDestroy()
@Component({
    selector: "app-user-create-form",
    templateUrl: "./user-create-form.component.html",
    styleUrls: ["./user-create-form.component.scss"],
})
export class UserCreateFormComponent implements OnInit {
    public createForm: FormGroup;

    constructor(
        private store: Store,
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.setupForm();
    }

    /**
     * Metodo para enviar informações para criação do usuario
     */
    public onSubmit() {
        const userCreation: UserCreate = {
            name: this.createForm.get("nameControl").value,
            senha: this.createForm.get("senhaControl").value,
            email: this.createForm.get("emailControl").value,
            cargo: this.createForm.get("cargoControl").value,
        };
/*         this.store.dispatch(
            new UserActions.CreateLog(
                "User Create " + userCreation.name,
                JSON.stringify(userCreation)
            )
        ); */

        this.store
            .dispatch(new UserActions.Create(userCreation))
            .pipe()
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
     * Inicia o formulario de criação de usuario
     */
    private setupForm() {
        this.createForm = this.formBuilder.group({
            nameControl: new FormControl("", [
                Validators.required,
                Validators.minLength(3),
            ]),
            senhaControl: new FormControl("", [
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
        });
    }
}
