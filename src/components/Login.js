import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fazer_login } from '../redux/actions/loginActions';
import { verificar_login_existe } from '../services/usuarioService';

const Login = props => {
   const [login, setLogin] = useState({
      email: 'c@gmail.com',
      senha: '123'
   })
   // const [login, setLogin] = useState({
   //    email: 'seergiio.felippe@gmail.com',
   //    senha: '123'
   // })

   const [msg, setMsg] = useState({
      msg: ''
   })

   let history = useHistory()

   const handleChange = event => {
      const { name, value } = event.target
      setLogin({ ...login, [name]: value })
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      const usuarios = props.usuarios

      if(verificar_login_existe(usuarios, login)){
         props.fazer_login({login, usuarios})
         history.push('/')
      }else{
         setMsg({ msg: 'Dados estão errados ou não existe'})
      }
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

         <div>
            <h2>
               {msg.msg}
            </h2>
         </div>

         <Link to="/usuario/formulario">Se cadastrar</Link>
      </form>
   );
}

const mapStateToProps = (state) => ({
   usuarios: state.usuarios,
   login: state.login,
})

const mapDispatchToProps = (dispatch) => ({
   fazer_login: (dados) => dispatch(fazer_login(dados)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);