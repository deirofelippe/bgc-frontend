import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { adicionar } from '../../redux/actions/produtoActions';

const FormularioProduto = props => {
   const estadoInicial = () => {
      return {
         id: v1(),
         nome: '',
         descricao: '',
         preco: '',
      }
   }

   const [produto, setProduto] = useState(estadoInicial())
   const [msg, setMsg] = useState('')

   const handleChange = event => {
      const { name, value } = event.target
      setProduto({ ...produto, [name]: value })
   }

   const limparCampos = () => {
      setProduto({ ...estadoInicial() })
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      props.adicionar(produto)
      limparCampos()
      setMsg('Produto cadastrado.')
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
         <div>
            <h1>{msg}</h1>
         </div>
      </form>
   );
}

const mapDispatchToProps = (dispatch) => ({
   adicionar: (produto) => dispatch(adicionar(produto)),
})

export default connect(() => ({}), mapDispatchToProps)(FormularioProduto);