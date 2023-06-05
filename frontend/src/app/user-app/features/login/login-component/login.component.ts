import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import { AuthActions } from "src/app/user-app/core/states/auth/auth.actions";

@UntilDestroy()
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public error: string;

    constructor(
        private store: Store,
        private router: Router,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.setupForm();
    }

    /**
     * Metodo para enviar informações do usuario
     * e realizar o login caso as informações sejam validadas pelo backend
     */
    public onSubmit(): void {
        this.error = null;
        const login = {
            username: this.loginForm.get("usernameControl").value,
            password: this.loginForm.get("senhaControl").value,
        };

        if (this.loginForm.valid) {
            this.store
                .dispatch(new AuthActions.Login(login.username, login.password))
                .subscribe(
                    () => {
                        this.successLogin();
                    },
                    (Error) => {
                        console.error("Erro durante o login:", Error);
                        this.error = "Erro ao realizar Login";
                    }
                );
        }
    }

    /**
     * Metodo para direcionar o usuario para tela de usuarios
     */
    async successLogin() {
        await this.router.navigate(["/user"], {
            queryParams: {},
            replaceUrl: true,
        });
    }

    /**
     * Inicia o formulario de login
     */
    private setupForm() {
        this.loginForm = this.formBuilder.group({
            usernameControl: new FormControl("", [
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
