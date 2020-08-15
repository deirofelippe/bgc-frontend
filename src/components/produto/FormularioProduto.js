import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { adicionarProduto } from '../../redux/actions/produtoActions';

const FormularioProduto = props => {
   const estadoInicial = () => {
      return {
         id: v1(),
         nome: 'a',
         descricao: 'b',
         preco: 'c',
      }
   }

   const [produto, setProduto] = useState(estadoInicial())

   const handleChange = event => {
      const { name, value } = event.target
      setProduto({ ...produto, [name]: value })
   }

   const limparCampos = () => {
      setProduto({ ...estadoInicial() })
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      console.log(produto)
      props.adicionar(produto)
      limparCampos()
   }
   
   return (
      <form onSubmit={(event) => handleSubmit(event)}>
         <label>Nome: 
            <input type="text"
               name="nome"
               value={produto.nome}
               onChange={handleChange} />
         </label>

         <label>Descrição: 
            <input type="text"
               name="descricao"
               value={produto.descricao}
               onChange={handleChange} />
         </label>

         <label>Preço: 
            <input type="text"
               name="preco"
               value={produto.preco}
               onChange={handleChange} />
         </label>

         <input type="submit" value="Cadastrar" />
      </form>
   );
}

const mapDispatchToProps = (dispatch) => ({
   adicionar: (produto) => dispatch(adicionarProduto(produto)),
})

export default connect(() => ({}), mapDispatchToProps)(FormularioProduto);