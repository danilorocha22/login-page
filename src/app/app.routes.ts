import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // Redireciona o caminho raiz para '/login'
    redirectTo: 'login',
    pathMatch: 'full' // Importante para garantir que apenas o caminho completo seja redirecionado
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'signup',
    title: 'Signup',
    loadComponent: () => import('./pages/signup/signup').then(m => m.Signup)
  }
];
