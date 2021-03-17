import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { buscar_produto } from '../../services/produtoService';
import { adicionar } from '../../redux/actions/reservaActions';
import { iniciar_estado_reserva } from '../../utils/inicializandoEstado';
import { buscar_usuario } from '../../services/usuarioService';
import axios from 'axios';

const Reserva = props => {
   const { idProduto } = useParams()

   const iniciar_estado = () => {
      const idUsuario = props.login.id
      return iniciar_estado_reserva(idProduto, idUsuario)
   }

   const [reserva, setReserva] = useState(iniciar_estado())
   const [produto, setProduto] = useState(buscar_produto(props.produtos, idProduto))
   const [statusReserva, setStatusReserva] = useState({ mensagem: '' })

   const handleSubmit = async event => {
      event.preventDefault()
      if(reserva.quantidade <= 0){
         return
      }

      await setReserva({
         ...reserva, 
         dataReserva: new Date(),
         numero: new Date().getTime()
      })
      // console.log(reserva)
      setStatusReserva({ mensagem: 'Reserva feita!'})
      await props.adicionar(reserva)
      
      const usuario = buscar_usuario(props.usuarios, props.login.id)

      await axios.post(process.env.REACT_APP_AWS_ENVIO_EMAIL, {
         nome_pessoa: usuario.nome,
         email: usuario.email,
         nome: produto.nome, 
         preco: produto.preco, 
      });
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
   adicionar: (reserva) => dispatch(adicionar(reserva))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reserva);