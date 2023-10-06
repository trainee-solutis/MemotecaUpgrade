import { CriarPensamentoComponent } from './componentes/pensamentos/criar-pensamento/criar-pensamento.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPensamentoComponent } from './componentes/pensamentos/listar-pensamento/listar-pensamento.component';
import { ExcluirPensamentoComponent } from './componentes/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentoComponent } from './componentes/pensamentos/editar-pensamento/editar-pensamento.component';
import { LoginScreenComponent } from './componentes/login-screen/login-screen.component';
import { HomeComponent } from './componentes/home/home.component';
import { GuardRoutes } from './componentes/login-screen/guardRoutes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginScreenComponent
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
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
