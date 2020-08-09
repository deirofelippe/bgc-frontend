import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EditProduto = props => {
   const { id } = useParams()

   const iniciarEstado = () => {
      const produtos = props.lista.produtos
      return produtos.find(produtoEncontrar => produtoEncontrar.id === id)
   }

   const [produto, setProduto] = useState(iniciarEstado)

   const handleChange = event => {
      const { name, value } = event.target
      setProduto({ ...produto, [name]: value })
   }

   return (
      <form>
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

         <button onClick={(event) => props.handleEdit(event, produto)}>Editar</button>
      </form>
   );
}

export default EditProduto;