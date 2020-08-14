import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { adicionarProduto } from '../../redux/actions/produtoActions';

const FormProduto = props => {
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

const mapDispatchToProps = (dispatch) => ({
   adicionar: (produto) => dispatch(adicionarProduto(produto)),
})

export default connect(() => ({}), mapDispatchToProps)(FormProduto);