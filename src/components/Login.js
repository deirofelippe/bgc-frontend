import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fazerLogin } from '../redux/actions/loginActions';

const Login = props => {
   const [login, setLogin] = useState({
      email: 'feh@gmail.com',
      senha: '123'
   })

   const handleChange = event => {
      const { name, value } = event.target
      setLogin({ ...login, [name]: value })
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      const usuarios = props.usuarios
      props.fazerLogin({login, usuarios})
   }
   
   return (
      <form onSubmit={(event) => handleSubmit(event)}>
         <label>E-mail: </label>
         <input type="email"
            name="email"
            value={login.email}
            onChange={handleChange} />

         <label>Senha: </label>
         <input type="password"
            name="senha"
            value={login.senha}
            onChange={handleChange} />

         <input type="submit" value="Fazer login" />

         <Link to="/usuario/formulario">Se cadastrar</Link>
      </form>
   );
}

const mapStateToProps = (state) => ({
   usuarios: state.usuarios,
})

const mapDispatchToProps = (dispatch) => ({
   fazerLogin: (dados) => dispatch(fazerLogin(dados)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);