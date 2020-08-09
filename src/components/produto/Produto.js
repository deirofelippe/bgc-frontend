import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Produto = props => {
   const { id } = useParams()
   const produto = props.lista.produtos.find(produto => produto.id === id)
   
   return (
      <div>
         <h1>{produto.nome}</h1>
         <h1>{produto.descricao}</h1>
         <h1>{produto.preco}</h1>
         <Link to="/reserva">Comprar</Link>
      </div>
   );
}

export default Produto;