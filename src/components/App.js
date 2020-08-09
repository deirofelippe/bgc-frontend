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
         ],
      }
      this.cadastrarProduto = this.cadastrarProduto.bind(this)
      this.deletarProduto = this.deletarProduto.bind(this)
      this.editarProduto = this.editarProduto.bind(this)
   }

   deletarProduto(indiceDeletar){
      this.setState(state => {
         const produtos = state.produtos.filter((produto, indice) => indice !== indiceDeletar)
         return { produtos }
      })
   }

   editarProduto(event, produtoEditado){
      event.preventDefault()
      this.setState(state => {
         const produtos = state.produtos.map((produto) => {
            if(produto.id === produtoEditado.id){
               return produtoEditado
            }
            return produto
         })

         return { produtos }
      })
   }

   cadastrarProduto(event, produto){
      event.preventDefault()
      this.setState(state => {
         const produtos = [...state.produtos, produto]
         return { produtos }
      })
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
                  <Rotas lista={produtos} 
                     handleSubmit={this.cadastrarProduto} 
                     handleDelete={this.deletarProduto} 
                     handleEdit={this.editarProduto}
                  />
               </main>
            </section>
         </Router>
      );
   }
}

export default App;