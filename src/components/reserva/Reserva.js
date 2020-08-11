import React, { useState } from 'react';
import gerarID from '../../utils/GerarID';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Reserva = props => {
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

   const handleChange = event => {
      const valor = event.target.value
      const chave = event.target.name
      setUsuario({ ...usuario, [chave]: valor })
      console.log(usuario)
   }

   const handleCEP = event => {
      event.preventDefault()
      const cep = usuario.cep
      const url = `https://viacep.com.br/ws/${cep}/json/`
      console.log(url);

      axios.get(url)
      .then(function (response) {
        // handle success
        console.log(response);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
   }

   const handleSubmit = event => {
      event.preventDefault()
      console.log('Reserva feita!')
      console.log(usuario)
   }
   
   return (
      <div>
         {produto.nome}
         {produto.preco}
         <form>
            Nome: <input type="text" name="nome" onChange={handleChange}/>
            E-mail: <input type="email" name="email" onChange={handleChange}/>
            CEP: <input type="text" name="cep" onChange={handleChange}/>
            <button onClick={handleCEP}>Buscar CEP</button>
            Endereço: <input type="text" name="endereco" onChange={handleChange}/>
            <button onClick={handleSubmit}>Fazer reserva</button>
         </form>
      </div>
   );
}

export default Reserva;