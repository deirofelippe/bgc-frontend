import React, { Component } from 'react';
import Rotas from './Rotas';
import BarraNavegacao from './BarraNavegacao';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         produtos: [
            { "id": "1", "nome": "Notebook", "descricao": "a", "preco": "5000", },
            { "id": "2", "nome": "Videogame", "descricao": "b", "preco": "6000", },
            { "id": "3", "nome": "Monitor", "descricao": "c", "preco": "3000", },
            { "id": "4", "nome": "Meri", "descricao": "d", "preco": "2000", },
         ]
      }
      this.cadastrarProduto = this.cadastrarProduto.bind(this)
   }

   cadastrarProduto(event, produto){
      event.preventDefault()
      const produtos = this.state.produtos
      produtos.push(produto)
      this.setState(produtos)
   }

   render(){
      const { produtos } = this.state
      return (
         <Router>
            <nav>
               <BarraNavegacao />
            </nav>
            <section>
               <main>
                  <Rotas lista={produtos} handleSubmit={this.cadastrarProduto} />
               </main>
            </section>
         </Router>
      );
   }
}

export default App;