import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ListProdutos from './produto/ListProdutos';
import FormProduto from './produto/FormProduto';

class Rotas extends Component {
   render() {
      return (
         <Switch>
            <Route exact path="/">
               <ListProdutos lista={this.props.lista} />
            </Route>
            <Route path="/produto/form">
               <FormProduto handleSubmit={this.props.handleSubmit} />
            </Route>
         </Switch>
      );
   }
}

export default Rotas;