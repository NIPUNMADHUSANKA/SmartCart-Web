import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>  import('./home/home').then((m)=> m.Home)
    },
    {
        path: 'shopping-list',
        loadComponent: () => import('./shopping-list-page/shopping-list-page').then((m)=>m.ShoppingListPage)
    },
    {
        path: "**",
        loadComponent: () => import('./home/home').then((m)=>m.Home)
    }
];
