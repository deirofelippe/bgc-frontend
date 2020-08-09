import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Produto(props) {
   const { id } = useParams()
   const produto = props.lista.find(produto => produto.id === id)
   
   return (
      <>
         <h1>{produto.nome}</h1>
         <h1>{produto.descricao}</h1>
         <h1>{produto.preco}</h1>
         <Link to="/reserva">Comprar</Link>
      </>
   );
}

export default Produto;