import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { buscar } from '../../services/produtoService';
import { adicionar } from '../../redux/actions/carrinhoActions';

const Produto = props => {
   const { id } = useParams()
   const produto = buscar(props.produtos, id)
   const login = props.login

   const handleSubmit = () => {
      props.adicionar_no_carrinho(id)
   }

   const formatarPreco = preco => {
      const formatter = new Intl.NumberFormat('pt-BR', 
         { style: 'currency', currency: 'BRL' }
      );

      return formatter.format(preco)
   }

   return (
      <div>
         <h2>{produto.nome}</h2>
         <h1>{produto.descricao}</h1>
         <h1>{formatarPreco(produto.preco)}</h1>
         
         {login.logado === true
            ? <button onClick={handleSubmit}>Reservar</button>
            : <Link to="/login">Faça login para reservar o produto</Link>
         }
      </div>
   );
}

const mapStateToProps = state => ({
   produtos: state.produtos,
   login: state.login
})

const mapDispatchToProps = dispatch => ({
   adicionar_no_carrinho: (id_produto) => dispatch(adicionar(id_produto))
})

export default connect(mapStateToProps, mapDispatchToProps)(Produto);