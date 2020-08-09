import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ListProdutos from './produto/ListProdutos';
import FormProduto from './produto/FormProduto';
import EditProduto from './produto/EditProduto';
import Produto from './produto/Produto';
import Reserva from './reserva/Reserva';

class Rotas extends Component {
   render() {
      return (
         <Switch>
            <Route exact path="/">
               <ListProdutos lista={this.props.lista} handleDelete={this.props.handleDelete} />
            </Route>
            <Route path="/produto/form">
               <FormProduto handleSubmit={this.props.handleSubmit} />
            </Route>
            <Route path="/produto/:id">
               <Produto lista={this.props.lista} />
            </Route>
            <Route path="/edit/produto/:id">
               <EditProduto lista={this.props.lista} handleEdit={this.props.handleEdit} />
            </Route>
            <Route path="/reserva/:id">
               <Reserva lista={this.props.lista} />
            </Route>
         </Switch>
      );
   }
}

export default Rotas;