import React from 'react';
import Rotas from './Rotas';
import BarraNavegacao from './BarraNavegacao';
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {

   // useEffect(() => {
   //    async function executar() {
   //       let response
   //       let url = 'https://0uxxq4nwcf.execute-api.sa-east-1.amazonaws.com/dev/produto'
   //       for (let i = 0; i < listas.produtos.length; i++) {
   //          let produto = listas.produtos.find((obj, index) => index === i)
   //          const { nome, descricao, preco } = produto
   //          const json = {
   //             nome,
   //             descricao,
   //             preco
   //          }
   //          try{
   //             console.log(json)
   //             response = await axios.post(url, json);
   //             console.log(response)
   //             break
   //          }catch(error){
   //             console.log(error)
   //          }
   //          break
   //       }
   //       // const id = response.data.produto.Item.id
   //       url = 'https://0uxxq4nwcf.execute-api.sa-east-1.amazonaws.com/dev/'
   //       response = await axios.get(url)
   //       console.log(response)
   //    }

   //    executar()
   // }, [listas])

   return (
      <Router>
         <nav>
            <BarraNavegacao />
         </nav>
         <section>
            <main>
               <Rotas />
            </main>
         </section>
      </Router>
   );
}

export default App;