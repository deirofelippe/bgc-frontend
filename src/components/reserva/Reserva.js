import React, { useState } from 'react';
import gerarID from '../../utils/GerarID';
import { useParams } from 'react-router-dom';

function Reserva(props) {
   const { id } = useParams()
   const usuarioInicial = {
      id: gerarID(),
      nome: '',
      email: '',
      cep: '',
      endereco: '',
   }

   const pegarProdutoNaLista = () => {
      const produtos = props.lista.produtos
      return produtos.find(obj => obj.id === id)
   }
   
   const [usuario, setUsuario] = useState(usuarioInicial)
   const produto = pegarProdutoNaLista()

   const handleChange = (event) => {
      const valor = event.target.value
      const chave = event.target.name
      setUsuario({ ...usuario, [chave]: valor })
      console.log(usuario)
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      console.log('Reserva feita!')
      console.log(usuario)
   }
   
   return (
      <>
         {produto.nome}
         {produto.preco}
         <form>
            Nome: <input type="text" name="nome" onChange={handleChange}/>
            E-mail: <input type="email" name="email" onChange={handleChange}/>
            CEP: <input type="text" name="ceo" onChange={handleChange}/>
            Endereço: <input type="text" name="endereco" onChange={handleChange}/>
            <button onClick={handleSubmit}>Fazer reserva</button>
         </form>
      </>
   );
}

export default Reserva;