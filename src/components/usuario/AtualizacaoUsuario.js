import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { atualizar } from '../../redux/actions/usuarioActions';
import { fazer_login_direto } from '../../redux/actions/loginActions';
import { buscar_CEP, verificar_pode_atualizar_email, buscar_usuario } from '../../services/usuarioService';

const AtualizacaoUsuario = props => {
   const { id } = useParams()
   
   const iniciar_estado_usuario = () =>{
      usuario_completo = buscar_usuario(props.usuarios, id)
      const { nome, email, senha, tipo } = usuario_completo
      return { id, nome, email, senha, tipo }
   }

   const iniciar_estado_endereco = () =>{
      return { ...usuario_completo.endereco }
   }
   
   let usuario_completo
   let history = useHistory()
   const [usuario, setUsuario] = useState(iniciar_estado_usuario())
   const [endereco, setEndereco] = useState(iniciar_estado_endereco())
   const [cepFoiBuscado, setCepFoiBuscado] = useState(false)

   const handleChangeEndereco = event => {
      const { name, value } = event.target
      setEndereco({ ...endereco, [name]: value })
   }
   const handleChangeUsuario = event => {
      const { name, value } = event.target
      setUsuario({ ...usuario, [name]: value })
   }

   const handleCEP = async event => {
      event.preventDefault()
      const cep = endereco.cep
      const dados = await buscar_CEP(cep)
      await setEndereco({
         ...endereco,
         estado: dados.uf, cidade: dados.localidade,
         bairro: dados.bairro, endereco: dados.logradouro
      })
      await setCepFoiBuscado(true)
   }

   const handleSubmit = async (event) => {
      event.preventDefault()

      if (!verificar_pode_atualizar_email(props.usuarios, usuario)) {
         return
      }
      
      const usuario_completo = {
         ...usuario,
         endereco: { ...endereco }
      }
      
      const login_usuario_cadastrado = {
         logado: true,
         id: usuario.id,
         email: usuario.email,
         nome: usuario.nome,
         tipoDeUsuario: usuario.tipo
      }
      
      await props.atualizar(usuario_completo)
      
      await props.fazer_login_direto(login_usuario_cadastrado)
      history.push("/")
   }

   const login = props.login

   return (
      <form onSubmit={(event) => handleSubmit(event)}>
         <label>Nome: 
            <input type="text" name="nome" value={usuario.nome} onChange={handleChangeUsuario} />
         </label>

         <label>E-mail: 
            <input type="email" name="email" value={usuario.email} onChange={handleChangeUsuario} />
         </label>

         <label>Senha: 
            <input type="password" name="senha" value={usuario.senha} onChange={handleChangeUsuario} />
         </label>

         {login.tipoDeUsuario === 'ADMIN' &&
            <>
               <label>Tipo de usuário: 
                  <select name="tipo" value={usuario.tipo} onChange={handleChangeUsuario}>
                     <option value="CLIENTE">Cliente</option>
                     <option value="ADMIN">Administrador</option>
                  </select>
               </label>
            </>
         }

         <label>CEP: 
            <input type="text" name="cep" value={endereco.cep} onChange={handleChangeEndereco} />
         </label>
         <button onClick={handleCEP}>Buscar CEP</button>

         {cepFoiBuscado === true &&
            <>
               <h2>{endereco.estado}</h2>
               <h2>{endereco.cidade}</h2>
               <h2>{endereco.bairro}</h2>
               <h2>{endereco.endereco}</h2>
            </>
         }

         <label>Número: 
            <input type="text" name="numero" value={endereco.numero} onChange={handleChangeEndereco} />
         </label>

         <input type="submit" value="Atualizar" />
      </form>
   );
}

const mapStateToProps = state => ({
   usuarios: state.usuarios,
   login: state.login
})

const mapDispatchToProps = dispatch => ({
   atualizar: (usuario) => dispatch(atualizar(usuario)),
   fazer_login_direto: (login) => dispatch(fazer_login_direto(login))
})

export default connect(mapStateToProps, mapDispatchToProps)(AtualizacaoUsuario);