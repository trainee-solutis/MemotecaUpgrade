import { GuardRoutes } from './services/guardRoutes';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';
import { CriarPensamentoComponent } from './components/pensamentos/criar-pensamento/criar-pensamento.component';
import { ListarPensamentoComponent } from './components/pensamentos/listar-pensamento/listar-pensamento.component';
import { ExcluirPensamentoComponent } from './components/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentoComponent } from './components/pensamentos/editar-pensamento/editar-pensamento.component';
import { HomeComponent } from './pages/home/home.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginScreenComponent,
    canActivate: [GuardRoutes]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'listarPensamento',
    component: ListarPensamentoComponent,
    canActivate: [GuardRoutes]
  },
  {
    path: 'criarPensamento',
    component: CriarPensamentoComponent,
    canActivate: [GuardRoutes]
  },
  {
    path: 'pensamentos/excluirPensamento/:id',
    component: ExcluirPensamentoComponent,
    canActivate: [GuardRoutes]
  },
  {
    path: 'pensamentos/editarPensamento/:id',
    component: EditarPensamentoComponent,
    canActivate: [GuardRoutes]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [GuardRoutes] //Apenas para validar sessão e desativar o botão de Login
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
