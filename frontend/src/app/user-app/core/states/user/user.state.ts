import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { UserActions } from "./user.action";
import { Observable, tap, timestamp } from "rxjs";
import { UserDetails } from "../../models/user.model";
import { UserService } from "../../services/user.services";
import { cloneDeep } from 'lodash-es';
import { LogService } from "../../services/logs.services";
import { LogCreate, LogsDetails } from "../../models/logs.model";


export class UserStateModel {
    public item: UserDetails;
    public items: UserDetails[] = [];
  }

  @State<UserStateModel>({
    name: 'user',
    defaults: {
      items: [],
      item: null,
    }
  })

  @Injectable()
  export class UserState {
    constructor(private store: Store, private userService: UserService, private logService: LogService) { }

    @Action(UserActions.LoadSingle)
    public loadSingle$(
      ctx: StateContext<UserStateModel>,
      action: UserActions.LoadSingle
    ): Observable<UserDetails> {
      return this.userService.single(action.id).pipe(
        tap((result: UserDetails) => {
          ctx.patchState({
            item: result,
          });
        })
      );
    }

    @Action(UserActions.GetAll)
    getAllUsers(
      { patchState }: StateContext<UserStateModel>) {
      return this.userService.getUsers().pipe(
        tap((users: UserDetails[]) => {
          patchState({
            items: cloneDeep(users),
        });
        })
      );
    }

    @Action(UserActions.CreateLog)
    public createLog$(ctx: StateContext<UserStateModel>, action: UserActions.CreateLog): Observable<LogsDetails> {
      const log: LogCreate = {
        payload: action.payload,
        action: action.actions,
        timestamp: new Date()
      }
      return this.logService.create(log)
    }

    @Action(UserActions.Create)
    public create$(
      ctx: StateContext<UserStateModel>,
      { user }: UserActions.Create
    ): Observable<UserDetails> {
      return this.userService.create(user).pipe(
        tap((result: UserDetails) => {
          this.store.dispatch(new UserActions.CreateSuccess(result));
        })
      );
    }


    @Action(UserActions.CreateSuccess)
    public createSucess$(ctx: StateContext<UserStateModel>, action: UserActions.CreateSuccess): void {
        const clone: UserDetails[] = cloneDeep(ctx.getState().items);

        clone.push(action.payload);

        ctx.patchState({
            items: clone,
        });
    }

    @Action(UserActions.Remove)
    public remove$(ctx: StateContext<UserStateModel>, { id }: UserActions.Remove): Observable<void> {
      return this.userService.remove(id).pipe(
        tap(() => {
          this.store.dispatch(new UserActions.RemoveSuccess(id));
        })
      );
    }

    @Action(UserActions.RemoveSuccess)
    public removeSucess$(ctx: StateContext<UserStateModel>, action: UserActions.RemoveSuccess): void {
        let clone: UserDetails[] = cloneDeep(ctx.getState().items);

        clone = clone.filter((user) => user.id !== action.id);
        ctx.patchState({
            items: clone,
        });
    }

    @Action(UserActions.Update)
    public update$(
      { patchState }: StateContext<UserStateModel>,
      { id, payload }: UserActions.Update
    ): Observable<UserDetails> {
      return this.userService.update(id, payload).pipe(
        tap((result: UserDetails) => {
          this.store.dispatch(new UserActions.UpdateSuccess(result));

          patchState({ item: result });
        })
      );
    }

    @Action(UserActions.UpdateSuccess)
    public updateSuccess$(ctx: StateContext<UserStateModel>, action: UserActions.UpdateSuccess): void {
        let clone: UserDetails[] = cloneDeep(ctx.getState().items);

        clone = clone.filter((user) => user.id !== action.payload.id);
        clone.push(action.payload);

        ctx.patchState({
            items: clone,
        });
    }
  }
