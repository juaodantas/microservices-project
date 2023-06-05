export interface UserDetails {
    id: string,
    name: string,
    senha: string,
    email: string,
    cargo: string,
  }
  export interface UserCreate {
    name: string,
    senha: string,
    email: string,
    cargo: string,
  }

  export interface UserUpdate {
    name: string,
    senha: string,
    email: string,
    cargo: string,
  }
