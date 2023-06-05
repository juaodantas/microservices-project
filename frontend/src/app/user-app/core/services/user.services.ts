import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserCreate, UserDetails, UserUpdate } from "../models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private endpoint = environment.apiUsers;
    private controller = 'user';

    constructor(private http: HttpClient) { }

    /**
     * Busca os usuarios cadastrados
     * @returns UserDetails[]
     */
    public getUsers(): Observable<UserDetails[]> {
      return this.http.get<UserDetails[]>(`${this.endpoint}/${this.controller}`);
    }
    /**
     * Metodo responsavel pela criação do usuario
     * @param payload
     * @returns UserDetails
     */
    public create(payload: UserCreate): Observable<UserDetails> {
        return this.http.post<UserDetails>(`${this.endpoint}/${this.controller}`, payload);
    }
    /**
     * Metodo responsavel pela remoção do usuario
     * @param id
     * @returns
     */
    public remove(id: string): Observable<void> {
        return this.http.delete<void>(`${this.endpoint}/${this.controller}/${id}`);
    }
    /**
     * Metodo para atualização do usuario
     * @param id
     * @param payload
     * @returns UserDetails
     */
    public update(id: string, payload: UserUpdate): Observable<UserDetails> {
        return this.http.patch<UserDetails>(`${this.endpoint}/${this.controller}/${id}`, payload);
    }
    /**
     * Metodo responsavel pela busca dos dados de um usuario
     * @param id
     * @returns UserDetails
     */
    public single(id: string): Observable<UserDetails> {
        return this.http.get<UserDetails>(`${this.endpoint}/${this.controller}/${id}`);
    }
  }
