import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { buscarProduto } from '../../services/produtoService';
import { adicionarReserva } from '../../redux/actions/reservaActions';
import { buscarCEP } from '../../services/serviceUsuario';

const Reserva = props => {
   const { id } = useParams()
   const estadoInicialReserva = () => {
      return {
         idProduto: id, idUsuario: v1(),
         quantidade: 0, dataReserva: '',
         numero: new Date().getTime(),
      }
   }

   const estadoInicialUsuario = () => {
      return {
         id: v1(), nome: 'a', email: 'a@gmail.com',
         cep: '21550400', estado: '', cidade: '',
         bairro: '', endereco: '', numero: '75',
      }
   }
   
   const [cepFoiBuscado, setCepFoiBuscado] = useState(false)
   const [usuario, setUsuario] = useState(estadoInicialUsuario())
   const [reserva, setReserva] = useState(estadoInicialReserva())
   const produto = buscarProduto(props.produtos, id)

   const handleChange = async event => {
      const valor = event.target.value
      const chave = event.target.name
      await setUsuario({ ...usuario, [chave]: valor })
   }

   const handleCEP = async event => {
      event.preventDefault()
      const cep = usuario.cep
      const dados = await buscarCEP(cep)
      await setUsuario({ 
         ...usuario, estado: dados.uf, cidade: dados.localidade,
         bairro: dados.bairro, endereco: dados.logradouro
      })
      setCepFoiBuscado(true)
      console.log(usuario)
   }

   const handleSubmit = async event => {
      event.preventDefault()
      await setReserva({...reserva, dataReserva: new Date().getTime()})
      await props.adicionarReserva(reserva)
      console.log('Reserva feita!')
      console.log(reserva)
      console.log(usuario)
   }

   return (
      <div>
         <h2>{produto.nome}</h2>
         <h2>{produto.preco}</h2>
         <form>
            Nome: <input type="text" name="nome" value={usuario.nome} onChange={handleChange}/>
            E-mail: <input type="email" name="email" value={usuario.email} onChange={handleChange}/>
            CEP: <input type="text" name="cep" value={usuario.cep} onChange={handleChange}/>
            {cepFoiBuscado === true &&
               <>
                  <h2>{usuario.estado}</h2>
                  <h2>{usuario.cidade}</h2>
                  <h2>{usuario.bairro}</h2>
                  <h2>{usuario.endereco}</h2>
               </>
            }
            Número: <input type="text" name="endereco" value={usuario.numero} onChange={handleChange}/>
            <button onClick={handleCEP}>Buscar CEP</button>
            <button onClick={handleSubmit}>Fazer reserva</button>
         </form>
      </div>
   );
}

const mapStateToProps = state => ({
   produtos: state.produtos,
})

const mapDispatchToProps = dispatch => ({
   adicionarReserva: (reserva) => dispatch(adicionarReserva(reserva))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reserva);