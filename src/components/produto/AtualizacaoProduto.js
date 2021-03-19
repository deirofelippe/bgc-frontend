import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { atualizar } from '../../redux/actions/produtoActions';
import { buscar } from '../../services/produtoService';
import { validar_preco } from '../../utils/validacoes';

const EditProduto = props => {
   const { id } = useParams()
   let history = useHistory()

   const [msg, setMsg] = useState('')

   const iniciarEstado = () => {
      return buscar(props.produtos, id)
   }

   const [produto, setProduto] = useState(iniciarEstado)

   const handleChange = event => {
      const { name, value } = event.target
      setProduto({ ...produto, [name]: value })
   }

   const handleUpdate = (event) => {
      event.preventDefault()
      if(!validar_preco(produto.preco)){
         setMsg('Digite um preço válido')
         return
      }
      let preco = produto.preco.toString()
      preco = preco.replace(',', '.')
      preco = parseFloat(preco)
      preco = preco.toFixed(2)
      produto.preco = preco

      if(produto.nome === ''){
         setMsg('Digite o nome do produto')
         return
      }

      props.atualizar(produto)
      history.push('/')
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

         <button onClick={handleUpdate}>Editar</button>

         <div>
            <h1>{msg}</h1>
         </div>
      </form>
   );
}

const mapStateToProps = state => ({
   produtos: state.produtos,
})

const mapDispatchToProps = dispatch => ({
   atualizar: (produto) => dispatch(atualizar(produto)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduto);