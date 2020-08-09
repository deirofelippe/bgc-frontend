import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListProdutos from './produto/ListProdutos';
import FormProduto from './produto/FormProduto';
import EditProduto from './produto/EditProduto';
import Produto from './produto/Produto';
import Reserva from './reserva/Reserva';

const Rotas = props => {
   return (
      <Switch>
         <Route exact path="/">
            <ListProdutos lista={props.lista} handleDelete={props.handleDelete} />
         </Route>
         <Route path="/produto/form">
            <FormProduto handleSubmit={props.handleSubmit} />
         </Route>
         <Route path="/produto/:id">
            <Produto lista={props.lista} />
         </Route>
         <Route path="/edit/produto/:id">
            <EditProduto lista={props.lista} handleEdit={props.handleEdit} />
         </Route>
         <Route path="/reserva/:id">
            <Reserva lista={props.lista} />
         </Route>
      </Switch>
   );
}

export default Rotas;