import React from 'react';
import { Route } from 'react-router-dom';
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
   <>
      <Route exact path="/">
         <ListagemProdutos />
      </Route>
      <Route exact path="/produto/:id">
         <Produto />
      </Route>
      <Route exact path="/produto/formulario">
         <FormularioProduto />
      </Route>
      <Route exact path="/produto/atualizacao/:id">
         <AtualizacaoProduto />
      </Route>

      <Route exact path="/usuarios">
         <ListagemUsuarios />
      </Route>
      <Route exact path="/usuario/:id">
         <Usuario />
      </Route>
      <Route exact path="/usuario/formulario">
         <FormularioUsuario />
      </Route>
      <Route exact path="/usuario/atualizacao/:id">
         <AtualizacaoUsuario />
      </Route>

      <Route exact path="/reserva/:id">
         <Reserva />
      </Route>
      <Route exact path="/login">
         <Login />
      </Route>
   </>
)

export default Rotas;