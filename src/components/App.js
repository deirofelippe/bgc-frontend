import React, { useState, useEffect } from 'react';
import Rotas from './Rotas';
import BarraNavegacao from './BarraNavegacao';
import { BrowserRouter as Router } from 'react-router-dom'
import pegarDados from '../utils/DadosBase.js';
import axios from 'axios';

function App() {
   const [listas, setListas] = useState(pegarDados())

   const deletarProduto = indiceDeletar => {
      setListas(state => {
         const produtos = state.produtos.filter((produto, indice) => indice !== indiceDeletar)
         return { produtos }
      })
   }

   useEffect(() => {
      async function executar() {
         let response
         let url = 'https://0uxxq4nwcf.execute-api.sa-east-1.amazonaws.com/dev/produto'
         for (let i = 0; i < listas.produtos.length; i++) {
            let produto = listas.produtos.find((obj, index) => index === i)
            const { nome, descricao, preco } = produto
            const json = {
               nome,
               descricao,
               preco
            }
            try{
               console.log(json)
               response = await axios.post(url, json);
               console.log(response)
               break
            }catch(error){
               console.log(error)
            }
            break
         }
         // const id = response.data.produto.Item.id
         url = 'https://0uxxq4nwcf.execute-api.sa-east-1.amazonaws.com/dev/'
         response = await axios.get(url)
         console.log(response)
      }

      executar()
   }, [listas])

   const editarProduto = (event, produtoEditado) => {
      event.preventDefault()
      setListas(state => {
         const produtos = state.produtos.map((produto) => {
            if (produto.id === produtoEditado.id) {
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