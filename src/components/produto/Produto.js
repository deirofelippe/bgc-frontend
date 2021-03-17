import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { buscar } from '../../services/produtoService';

const Produto = props => {
   const { id } = useParams()
   const produto = buscar(props.produtos, id)

   return (
      <div>
         <h2>{produto.nome}</h2>
         <h1>{produto.descricao}</h1>
         <h1>{produto.preco}</h1>
         <Link to={`/reserva/${produto.id}`}>Comprar</Link>
      </div>
   );
}

const mapStateToProps = (state) => ({
   produtos: state.produtos
})

export default connect(mapStateToProps)(Produto);