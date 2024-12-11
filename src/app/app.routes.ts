import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { authGuard } from '../tools/auth.guard';
import { ArticleService } from '../services/article.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
    },
    {
        path: "home",
        loadComponent: () => import('../views/home/home.component')
            .then(m => m.HomeComponent),
        canMatch: [authGuard],
        resolve: {
            articles: () => inject(ArticleService).all()
        }
    },
    {
        path: "editor/:id",
        loadComponent: () => import('../views/article-edit/article-edit.component')
            .then(m => m.ArticleEditComponent),
        canMatch: [authGuard],
        resolve: {
            article: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                const id = +(route.paramMap.get("id") || 0)
                return id ? inject(ArticleService).byId(id).pipe(catchError(() => of(undefined))) : undefined
            }
        }
    },
    {
        path: "login",
        loadComponent: () => import('../views/login/login.component')
            .then(m => m.LoginComponent),
    },
    {
        path: "register",
        loadComponent: () => import('../views/register/register.component')
            .then(m => m.RegisterComponent)
    },
    {
        path: "**",
        loadComponent: () => import('../views/not-found/not-found.component')
            .then(m => m.NotFoundComponent)
    }
];
