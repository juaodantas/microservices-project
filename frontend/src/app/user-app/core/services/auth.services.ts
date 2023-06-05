import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private endpoint = environment.apiUsers;
    private controller = 'auth';

    constructor(private http: HttpClient) { }

    /**
     * Metodo para realizar o login
     * @param login
     * @param senha
     * @returns Access token
     */
    public login(login: string, senha: string){
      const data = { username: login, password: senha };
      console.log(data)
      return this.http.post(
        `${this.endpoint}/${this.controller}/login`,
        data,
        httpOptions
      );
    }
  }
