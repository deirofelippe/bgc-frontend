import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { buscarProduto } from '../../services/produtoService';
import { adicionarReserva } from '../../redux/actions/reservaActions';

const Reserva = props => {
   const { id } = useParams()
   const estadoInicialReserva = () => {
      return {
         idProduto: id, idUsuario: props.login.id,
         quantidade: 0, dataReserva: '',
         numero: new Date().getTime(),
      }
   }

   const [reserva, setReserva] = useState(estadoInicialReserva())

   const handleSubmit = async event => {
      event.preventDefault()
      await setReserva({...reserva, dataReserva: new Date().getTime()})
      await props.adicionarReserva(reserva)
      console.log('Reserva feita!')
      console.log(reserva)
   }

   const login = props.login
   const produto = buscarProduto(props.produtos, id)

   return (
      <div>
         <h2>{produto.nome}</h2>
         <h2>{produto.preco}</h2>
         <form>
            {login.logado === true
            ? <button onClick={handleSubmit}>Fazer reserva</button>
            : <Link to="/login">Faça login para reservar o produto</Link>
            }
            
         </form>
      </div>
   );
}

const mapStateToProps = state => ({
   produtos: state.produtos,
   login: state.login
})

const mapDispatchToProps = dispatch => ({
   adicionarReserva: (reserva) => dispatch(adicionarReserva(reserva))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reserva);