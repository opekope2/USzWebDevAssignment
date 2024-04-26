import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToRecipes = () => redirectLoggedInTo(["recipes"])
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"])

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "recipes",
        component: RecipeListComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
            authGuardPipe: redirectUnauthorizedToLogin
        }
    },
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "**",
        redirectTo: "/"
    }
];
