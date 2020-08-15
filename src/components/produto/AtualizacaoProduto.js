import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { atualizarProduto } from '../../redux/actions/produtoActions';
import { buscarProduto } from '../../services/produtoService';

const EditProduto = props => {
   const { id } = useParams()

   const iniciarEstado = () => {
      return buscarProduto(props.produtos, id)
   }

   const [produto, setProduto] = useState(iniciarEstado)

   const handleChange = event => {
      const { name, value } = event.target
      setProduto({ ...produto, [name]: value })
   }

   const handleUpdate = (event) => {
      event.preventDefault()
      props.atualizar(produto)
      // console.log(produto)
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

         <button onClick={(event) => handleUpdate(event)}>Editar</button>
      </form>
   );
}

const mapStateToProps = state => ({
   produtos: state.produtos,
})

const mapDispatchToProps = dispatch => ({
   atualizar: (produto) => dispatch(atualizarProduto(produto)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduto);