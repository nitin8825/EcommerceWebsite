/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
    providedIn: 'root'
})
export class LocalstorageService {
    constructor() {}

    setToken(data: any) {
        localStorage.setItem(TOKEN, data);
    }
    getToken(): string {
        return localStorage.getItem(TOKEN);
    }

    getUserIdFromToken() {
        const token = this.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            if (tokenDecode) {
                return tokenDecode.userId;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    isValidToken() {
        const token = this.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            return !this._tokenExpired(tokenDecode.exp);
        } else {
            return false;
        }
    }

    private _tokenExpired(expiration): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }

    removeToken() {
        localStorage.removeItem(TOKEN);
    }
}
