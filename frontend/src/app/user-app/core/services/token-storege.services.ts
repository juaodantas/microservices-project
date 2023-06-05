import { Injectable } from "@angular/core";

const ACCESS_TOKEN = 'access_token';

@Injectable({
    providedIn: 'root',
  })
  export class TokenStorageService {

  /**
     * Responsible for cleaning the browser's localstorage
     */
  public signOut(): void {
    localStorage.clear();
  }

    /**
     * Set the local storage token and update it
     * @param token
     */
    public saveAccessToken(token: string): void {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.setItem(ACCESS_TOKEN, token);
      }
  }
