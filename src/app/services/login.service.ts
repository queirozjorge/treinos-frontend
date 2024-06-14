import { HttpClient, HttpParams } from '@angular/common/http';
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
            }),
            catchError(error => {    
                return throwError(() => new Error("Falha ao realizar login. Tente novamente mais tarde"));
            })
        )
    }

    signup(nome: string, password: string, email: string, dataNascimento: string) {
        return this.httpClient.post<LoginResponse>(`${this.apiUrl}/usuario/cadastrar`, {nome, password, email, dataNascimento})
            .pipe(
                catchError(error => {
                    return throwError(() => new Error("Falha ao realizar cadastro. Tente novamente mais tarde"));
                })
            );
    }

    recoverPassword(email: string, link: string) {

        let params = new HttpParams()
        .set('email', email)
        .set('link', link);

        return this.httpClient.get(`${this.apiUrl}/recuperar-senha`, {params})
            .pipe(
                catchError(error => {
                    return throwError(() => new Error("Falha ao enviar email. Tente novamente mais tarde"));
                })
            )
    }

}
