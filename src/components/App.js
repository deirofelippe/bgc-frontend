import React, { useState } from 'react';
import Rotas from './Rotas';
import BarraNavegacao from './BarraNavegacao';
import { BrowserRouter as Router } from 'react-router-dom'
import pegarDados from '../utils/DadosBase.js';

function App() {
   const [listas, setListas] = useState(pegarDados())

   const deletarProduto = indiceDeletar => {
      setListas(state => {
         const produtos = state.produtos.filter((produto, indice) => indice !== indiceDeletar)
         return { produtos }
      })
   }

   const editarProduto = (event, produtoEditado) => {
      event.preventDefault()
      setListas(state => {
         const produtos = state.produtos.map((produto) => {
            if(produto.id === produtoEditado.id){
               return produtoEditado
            }
            return produto
         })

         return { produtos }
      })
   }

   const cadastrarProduto = (event, produto) => {
      event.preventDefault()
      setListas(state => {
         const produtos = [...state.produtos, produto]
         return { produtos }
      })
   }

   return (
      <Router>
         <nav>
            <BarraNavegacao />
         </nav>
         <section>
            <main>
               <Rotas lista={listas} 
                  handleSubmit={cadastrarProduto} 
                  handleDelete={deletarProduto} 
                  handleEdit={editarProduto}
               />
            </main>
         </section>
      </Router>
   );
}

export default App;