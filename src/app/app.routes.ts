import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'' ,loadComponent: () => import('./core/layout/layout.component').then(m => m.LayoutComponent),
        children: [        
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home',loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)},
        {path: 'products',loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent)},
    ]},
];
