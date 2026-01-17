import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { NoAuthGuard } from './auth/no-auth-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home').then((m) => m.Home),
        canActivate: [AuthGuard]
    },
    {
        path: 'shopping-list',
        loadComponent: () => import('./shopping-list-page/shopping-list-page').then((m) => m.ShoppingListPage),
        canActivate: [AuthGuard]
    },
    {
        path: 'history',
        loadComponent: () => import('./history/history').then((m)=>m.History),
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile').then((m)=>m.Profile),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login').then((m) => m.Login),
        canActivate: [NoAuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register').then((m)=> m.Register),
        canActivate: [NoAuthGuard]
    },
    {
        path: 'ai-suggestions',
        loadComponent: () => import('./ai-suggestion/ai-suggestion').then((m)=>m.AiSuggestion),
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        loadComponent: () => import('./home/home').then((m) => m.Home)
    }
];
