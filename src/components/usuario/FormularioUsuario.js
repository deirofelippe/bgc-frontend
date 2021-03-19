import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { adicionar } from '../../redux/actions/usuarioActions';
import { fazer_login_direto } from '../../redux/actions/loginActions';
import { buscar_CEP, verificar_email_existe } from '../../services/usuarioService';

const FormularioUsuario = props => {
   const estado_inicial_usuario = () => {
      return {
         id: v1(), nome: '', email: '', senha: "", tipo_de_usuario: "CLIENTE",
      }
   }

   const estado_inicial_endereco = () => {
      return {
         cep: '', estado: '', cidade: '',
         bairro: '', endereco: '', numero: '',
      }
   }

   let history = useHistory()
   const [usuario, setUsuario] = useState(estado_inicial_usuario())
   const [endereco, setEndereco] = useState(estado_inicial_endereco())
   const [cepFoiBuscado, setCepFoiBuscado] = useState(false)
   const [msg, setMsg] = useState('')

   const handleChangeEndereco = event => {
      const { name, value } = event.target
      setEndereco({ ...endereco, [name]: value })
   }
   const handleChangeUsuario = event => {
      const { name, value } = event.target
      setUsuario({ ...usuario, [name]: value })
   }

   const limparCampos = () => {
      setUsuario({ ...usuario, ...estado_inicial_usuario() })
      setEndereco({ ...endereco, ...estado_inicial_endereco() })
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
      setCepFoiBuscado(true)
   }

   const handleSubmit = async (event) => {
      event.preventDefault()

      if (verificar_email_existe(props.usuarios, usuario.email)) {
         setMsg('Email ja cadastrado.')
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

      await props.adicionar(usuario_completo)

      if(login.tipo_de_usuario === 'ADMIN'){
         history.push("/usuarios")
         return
      }

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

         {login.tipo_de_usuario === 'ADMIN' &&
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

         <input type="submit" value="Cadastrar" />
         
         <h1>
            {msg}
         </h1>
      </form>
   );
}

const mapStateToProps = state => ({
   usuarios: state.usuarios,
   login: state.login
})

const mapDispatchToProps = dispatch => ({
   adicionar: (usuario) => dispatch(adicionar(usuario)),
   fazer_login_direto: (login) => dispatch(fazer_login_direto(login))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormularioUsuario);