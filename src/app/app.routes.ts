import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const redirectLoggedInToRecipes = () => redirectLoggedInTo(["recipes"])
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"])

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
            authGuardPipe: redirectLoggedInToRecipes
        }
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
            authGuardPipe: redirectLoggedInToRecipes
        }
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
        path: "recipes/create",
        component: EditRecipeComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
            authGuardPipe: redirectUnauthorizedToLogin
        }
    },
    {
        path: "recipes/:recipeId",
        component: ViewRecipeComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
            authGuardPipe: redirectUnauthorizedToLogin
        }
    },
    {
        path: "recipes/:recipeId/edit",
        component: EditRecipeComponent,
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
