import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./shopping-list-page/shopping-list-page').then((m) => m.ShoppingListPage)
    },
    {
        path: 'shopping-list',
        loadComponent: () => import('./shopping-list-page/shopping-list-page').then((m) => m.ShoppingListPage)
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login').then((m) => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register').then((m)=> m.Register)
    },
    {
        path: "**",
        loadComponent: () => import('./shopping-list-page/shopping-list-page').then((m) => m.ShoppingListPage)
    }
];
