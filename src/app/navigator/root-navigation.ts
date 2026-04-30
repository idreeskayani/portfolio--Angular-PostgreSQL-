import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/portfolio/portfolio.page').then(m => m.PortfolioPage),
    title: 'Muhammad Idrees Kayani – Portfolio'
  },
  {
    path: 'blog',
    loadComponent: () => import('../pages/blog/blog-list.component').then(m => m.BlogListComponent),
    title: 'Blog – Muhammad Idrees Kayani'
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('../pages/blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
  },
  {
    path: 'admin/login',
    loadComponent: () => import('../pages/admin/login/login.component').then(m => m.LoginComponent),
    title: 'Admin Login'
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('../pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    title: 'Admin Dashboard'
  },
  { path: '**', redirectTo: '' }
];
