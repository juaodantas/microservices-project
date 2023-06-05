import { UserCreate, UserDetails, UserUpdate } from "../../models/user.model";

export namespace UserActions {
    export class GetAll {
      public static readonly type = '[API] Get All User';
    }

    export class LoadSingle {
        public static readonly type = '[API] Load Single User';

        constructor(public id: string) {}
    }
    export class CreateLog {
        public static readonly type = '[API] Create Log for User';
        constructor(public actions: string,public payload: string) {}
      }

    export class Create {
        public static readonly type = '[API] Create User';
        constructor(public user: UserCreate) {}
      }
    export class CreateSuccess {
        public static readonly type = '[MEMORY] Create User Success';

        constructor(public payload: UserDetails) {}
    }

    export class Update {
        public static readonly type = '[API] Update User';
        constructor(public id: string, public payload: UserUpdate) {}
      }

      export class UpdateSuccess {
        public static readonly type = '[MEMORY] Update User Success';
        constructor(public payload: UserDetails) {}
      }


    export class Remove {
        public static readonly type = '[API] Remove User';

        constructor(public id: string) {}
      }

      export class RemoveSuccess {
        public static readonly type = '[MEMORY] Remove User Sucess';

        constructor(public id: string) {}
      }
}
