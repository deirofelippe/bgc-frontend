import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ListProdutos from './Produto/ListProdutos';
import FormProduto from './Produto/FormProduto';

class Rotas extends Component {
   render() {
      return (
         <Switch>
            <Route exact path="/">
               <ListProdutos />
            </Route>
            <Route path="/produto/form">
               <FormProduto />
            </Route>
         </Switch>
      );
   }
}

export default Rotas;