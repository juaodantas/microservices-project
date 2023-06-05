export namespace AuthActions {
    export class Login {
      public static readonly type = '[API] Login User';
      constructor(public username: string,public senha: string) {}
    }
  }
