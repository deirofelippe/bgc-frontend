import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { adicionar } from '../../redux/actions/produtoActions';
import { validar_preco } from '../../utils/validacoes';

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
      console.log(validar_preco(produto.preco))
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

      props.adicionar(produto)
      limparCampos()
      setMsg('Produto cadastrado.')
   }
   
   return (
      <form onSubmit={handleSubmit}>
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