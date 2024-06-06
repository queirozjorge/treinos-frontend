import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    apiUrl: string = "http://localhost:8080";

    constructor(private httpClient: HttpClient) { }

    login(email: string, password: string) {
        return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, {email, password}).pipe( 
        tap((value) => {
            sessionStorage.setItem("auth-token", value.token)
            sessionStorage.setItem("username", value.name)
        })
        )
    }

    signup(nome: string, password: string, email: string, dataNascimento: string) {
        console.log(nome + " " + password + " " + email + " " + dataNascimento)
        return this.httpClient.post<LoginResponse>(`${this.apiUrl}/usuario/cadastrar`, {nome, password, email, dataNascimento})
            .pipe(
                catchError(error => {
                    const errorMessage = error.error && error.error.message ? error.error.message : "Erro desconhecido. Por favor, tente novamente mais tarde";
                    return throwError(() => new Error(errorMessage));
                })
            );
    }

}
