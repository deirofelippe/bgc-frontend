import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListagemProdutos from './produto/ListagemProdutos';
import ListagemUsuarios from './usuario/ListagemUsuarios';
import FormularioProduto from './produto/FormularioProduto';
import FormularioUsuario from './usuario/FormularioUsuario';
import AtualizacaoProduto from './produto/AtualizacaoProduto';
import AtualizacaoUsuario from './usuario/AtualizacaoUsuario';
import Produto from './produto/Produto';
import Usuario from './usuario/Usuario';
import Login from './Login';
import Reserva from './reserva/Reserva';

const Rotas = props => (
   <Switch>
      <Route exact path="/">
         <ListagemProdutos />
      </Route>
      <Route path="/produto/formulario">
         <FormularioProduto />
      </Route>
      <Route path="/produto/:id">
         <Produto />
      </Route>
      <Route path="/edit/produto/:id">
         <AtualizacaoProduto />
      </Route>

      <Route path="/usuarios">
         <ListagemUsuarios />
      </Route>
      <Route path="/usuario/formulario">
         <FormularioUsuario />
      </Route>
      <Route path="/usuario/:id">
         <Usuario />
      </Route>
      <Route path="/produto/atualizacao/:id">
         <AtualizacaoUsuario />
      </Route>

      <Route path="/reserva/:id">
         <Reserva />
      </Route>
      <Route path="/login">
         <Login />
      </Route>
   </Switch>
)

export default Rotas;