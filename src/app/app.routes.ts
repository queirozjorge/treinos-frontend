import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PrincipalBoardComponent } from './pages/principal-board/principal-board.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
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
    },
    {
        path: "recover-password",
        component: RecoveryPasswordComponent
    }
];
