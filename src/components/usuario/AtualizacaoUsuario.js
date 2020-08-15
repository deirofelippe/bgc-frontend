import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { atualizarUsuario } from '../../redux/actions/usuarioActions';
import { fazerLoginDireto } from '../../redux/actions/loginActions';
import { buscarCEP, emailNaoPodeSerAtualizado, buscarUsuario } from '../../services/usuarioService';

const AtualizacaoUsuario = props => {
   const { id } = useParams()
   
   const iniciarEstadoUsuario = () =>{
      usuarioCompleto = buscarUsuario(props.usuarios, id)
      const { nome, email, senha, tipo } = usuarioCompleto
      return { id, nome, email, senha, tipo }
   }

   const iniciarEstadoEndereco = () =>{
      return { ...usuarioCompleto.endereco }
   }
   
   let usuarioCompleto
   const [usuario, setUsuario] = useState(iniciarEstadoUsuario())
   const [endereco, setEndereco] = useState(iniciarEstadoEndereco())
   const [cepFoiBuscado, setCepFoiBuscado] = useState(false)

   const handleChangeEndereco = event => {
      const { name, value } = event.target
      setEndereco({ ...endereco, [name]: value })
      console.log(endereco)
   }
   const handleChangeUsuario = event => {
      const { name, value } = event.target
      setUsuario({ ...usuario, [name]: value })
      console.log(usuario)
   }

   const handleCEP = async event => {
      event.preventDefault()
      const cep = endereco.cep
      const dados = await buscarCEP(cep)
      await setEndereco({
         ...endereco,
         estado: dados.uf, cidade: dados.localidade,
         bairro: dados.bairro, endereco: dados.logradouro
      })
      setCepFoiBuscado(true)
   }

   const handleSubmit = (event) => {
      event.preventDefault()

      const naoPodeSerAtualizado = emailNaoPodeSerAtualizado(props.usuarios, usuario)
      if (naoPodeSerAtualizado) {
         return
      }
      const usuarioCompleto = {
         ...usuario,
         endereco: { ...endereco }
      }
      
      const loginUsuarioCadastrado = {
         logado: true,
         id: usuario.id,
         email: usuario.email,
         nome: usuario.nome,
         tipoDeUsuario: usuario.tipo
      }
      
      props.atualizar(usuarioCompleto)
      
      if(login.email !== usuario.email){
         return
      }
      
      props.fazerLoginDireto(loginUsuarioCadastrado)
      // limparCampos()
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
   atualizar: (usuario) => dispatch(atualizarUsuario(usuario)),
   fazerLoginDireto: (login) => dispatch(fazerLoginDireto(login))
})

export default connect(mapStateToProps, mapDispatchToProps)(AtualizacaoUsuario);