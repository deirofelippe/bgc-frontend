import React, { useState } from 'react';
import gerarID from '../../utils/GerarID';

const FormProduto = props => {
   const [produto, setProduto] = useState({
      id: gerarID(),
      nome: '',
      descricao: '',
      preco: '',
   })

   const handleChange = event => {
      const { name, value } = event.target
      setProduto({ ...produto, [name]: value })
   }

   const limparCampos = () => {
      const produtoLimpo = {
         id: gerarID(),
         nome: '',
         descricao: '',
         preco: '',
      }
      setProduto({...produtoLimpo})
   }

      return (
         <form onSubmit={(event) => {
            props.handleSubmit(event, produto)
            limparCampos()
         }}>
            <label>Nome: </label>
            <input type="text" 
               name="nome" 
               value={produto.nome} 
               onChange={handleChange} />

            <label>Descrição: </label>
            <input type="text" 
               name="descricao" 
               value={produto.descricao} 
               onChange={handleChange} />
            
            <label>Preço: </label>
            <input type="text" 
               name="preco" 
               value={produto.preco} 
               onChange={handleChange} />

            <input type="submit" value="Cadastrar" />
         </form>
      );
}

export default FormProduto;