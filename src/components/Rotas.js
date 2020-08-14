import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListProdutos from './produto/ListProdutos';
import FormProduto from './produto/FormProduto';
import EditProduto from './produto/EditProduto';
import Produto from './produto/Produto';
import Reserva from './reserva/Reserva';

const Rotas = props => (
   <Switch>
      <Route exact path="/">
         <ListProdutos />
      </Route>
      <Route path="/produto/form">
         <FormProduto />
      </Route>
      <Route path="/produto/:id">
         <Produto />
      </Route>
      <Route path="/edit/produto/:id">
         <EditProduto />
      </Route>
      <Route path="/reserva/:id">
         <Reserva />
      </Route>
   </Switch>
)

export default Rotas;