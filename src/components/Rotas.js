import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListagemProdutos from './produto/ListagemProdutos';
import ListagemUsuarios from './usuario/ListagemUsuarios';
import FormularioProduto from './produto/FormularioProduto';
import FormularioUsuario from './usuario/FormularioUsuario';
import AtualizacaoProduto from './produto/AtualizacaoProduto';
import AtualizacaoUsuario from './usuario/AtualizacaoUsuario';
import Produto from './produto/Produto';
import Usuario from './usuario/Usuario';
import Login from './Login';
import CarrinhoCompra from './reserva/CarrinhoCompra';
// import Reserva from './reserva/Reserva';
// import HistoricoReserva from './reserva/HistoricoReserva';

const Rotas = props => (
   <>
   <Switch>
      <Route exact path="/usuarios">
         <ListagemUsuarios />
      </Route>
      <Route exact path="/login">
         <Login />
      </Route>
      <Route exact path="/">
         <ListagemProdutos />
      </Route>
   </Switch>

   <Switch>
      <Route exact path="/produto/atualizacao/:id">
         <AtualizacaoProduto />
      </Route>
      <Route path="/produto/formulario">
         <FormularioProduto />
      </Route>
      <Route path="/produto/:id">
         <Produto />
      </Route>
   </Switch>
   
   <Switch>
      <Route exact path="/usuario/atualizacao/:id">
         <AtualizacaoUsuario />
      </Route>
      <Route path="/usuario/formulario">
         <FormularioUsuario />
      </Route>
      <Route path="/usuario/:id">
         <Usuario />
      </Route>
   </Switch>

   <Switch>
      <Route path="/carrinho">
         <CarrinhoCompra />
      </Route>
      {/* <Route path="/reserva/:idProduto">
         <Reserva />
      </Route>
      <Route path="/reserva">
         <HistoricoReserva />
      </Route> */}
   </Switch>

   </>
)

export default Rotas;