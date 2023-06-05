import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { AuthService } from "../../services/auth.services";
import { AuthActions } from "./auth.actions";
import { tap } from "rxjs";
import { TokenStorageService } from "../../services/token-storege.services";

export class AuthStateModel {
    public items: string;
  }

  @State<AuthStateModel>({
    name: 'auth',
    defaults: {
      items: null
    }
  })

  @Injectable()
  export class AuthState {
    constructor(private store: Store, private authService: AuthService, private tokenStorage: TokenStorageService) { }

    @Action(AuthActions.Login)
    Login({ patchState }: StateContext<AuthStateModel>,action: AuthActions.Login) {
        return this.authService.login(action.username, action.senha).pipe(
            tap((response: any) => {
              const token = response.access_token;
              this.tokenStorage.saveAccessToken(token);
            })
          );
        }

  }
