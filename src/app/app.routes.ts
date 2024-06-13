import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PrincipalBoardComponent } from './pages/principal-board/principal-board.component';
import { LoadingComponent } from './pages/loading/loading.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "board",
        component: PrincipalBoardComponent
    },
    {
        path: "loading",
        component: LoadingComponent
    }
];
