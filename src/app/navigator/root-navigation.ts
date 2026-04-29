import { Routes } from '@angular/router';

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/portfolio/portfolio.page').then(m => m.PortfolioPage),
    title: 'Muhammad Idrees Kayani – Portfolio'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
