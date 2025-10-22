import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard/auth-guard';

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
  },
  {
    path: 'user',
    title: 'Usuário',
    loadComponent: () => import('./pages/user/user').then(m => m.User),
    canActivate: [AuthGuard]
  }
];
