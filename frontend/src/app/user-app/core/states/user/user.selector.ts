import { Selector } from "@ngxs/store";
import { UserState, UserStateModel } from "./user.state";
import { UserDetails } from "../../models/user.model";
import { cloneDeep } from 'lodash-es';


export class UserSelectors {
    @Selector([UserState])
    public static getUsers(state: UserStateModel): UserDetails[] {
      return cloneDeep(state.items);
    }
    @Selector([UserState])
    public static currentUser(state: UserStateModel): UserDetails {
      return cloneDeep(state.item);
    }
  }

