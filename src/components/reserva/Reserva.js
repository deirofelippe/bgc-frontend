import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { buscarProduto } from '../../services/produtoService';
import { adicionarReserva } from '../../redux/actions/reservaActions';
import { iniciarEstadoReserva } from '../../utils/inicializandoEstado';
import { buscarUsuario } from '../../services/usuarioService';

const Reserva = props => {
   const { idProduto } = useParams()

   const iniciarEstado = () => {
      const idUsuario = props.login.id
      return iniciarEstadoReserva(idProduto, idUsuario)
   }

   const [reserva, setReserva] = useState(iniciarEstado())
   const [produto, setProduto] = useState(buscarProduto(props.produtos, idProduto))
   const [statusReserva, setStatusReserva] = useState({ mensagem: '' })

   const handleSubmit = event => {
      event.preventDefault()
      if(reserva.quantidade <= 0){
         return
      }

      setReserva({
         ...reserva, 
         dataReserva: new Date(),
         numero: new Date().getTime()
      })
      console.log(reserva)
      setStatusReserva({ mensagem: 'Reserva feita!'})
      props.adicionarReserva(reserva)

      const usuario = buscarUsuario(props.usuarios, props.login.id)
   }

   const handleChange = event => {
      const { name, value } = event.target
      if(value <= 0){
         return
      }
      setReserva({ ...reserva, [name]: value })
   }

   const login = props.login

   return (
      <div>
         <h2>{produto.nome}</h2>
         <h2>{produto.preco}</h2>
         <form>
            <label>Quantidade: 
               <input type="number" name="quantidade" value={reserva.quantidade} onChange={handleChange} />
            </label>
            {login.logado === true
            ? <button onClick={handleSubmit}>Fazer reserva</button>
            : <Link to="/login">Faça login para reservar o produto</Link>
            }
            
            <h3>
               {statusReserva.mensagem}
            </h3>
         </form>
      </div>
   );
}

const mapStateToProps = state => ({
   produtos: state.produtos,
   login: state.login,
   usuarios: state.usuarios
})

const mapDispatchToProps = dispatch => ({
   adicionarReserva: (reserva) => dispatch(adicionarReserva(reserva))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reserva);