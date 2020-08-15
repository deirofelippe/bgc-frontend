import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { adicionarUsuario } from '../../redux/actions/usuarioActions';
import { fazerLoginDireto } from '../../redux/actions/loginActions';
import { buscarCEP, emailJaExiste } from '../../services/usuarioService';

const FormularioUsuario = props => {
   const estadoInicialUsuario = () => {
      return {
         id: v1(), nome: 'a', email: '@gmail.com', senha: "", tipo: "CLIENTE",
      }
   }

   const estadoInicialEndereco = () => {
      return {
         cep: '21550400', estado: '', cidade: '',
         bairro: '', endereco: '', numero: '75',
      }
   }

   const [usuario, setUsuario] = useState(estadoInicialUsuario())
   const [endereco, setEndereco] = useState(estadoInicialEndereco())
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

   const limparCampos = () => {
      setUsuario({ ...usuario, ...estadoInicialUsuario() })
      setEndereco({ ...endereco, ...estadoInicialEndereco() })
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
      console.log(endereco)
      setCepFoiBuscado(true)
   }

   const handleSubmit = (event) => {
      event.preventDefault()

      const emailExiste = emailJaExiste(props.usuarios, usuario.email)
      if (emailExiste) {
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

      props.adicionarUsuario(usuarioCompleto)

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

         <input type="submit" value="Cadastrar" />
      </form>
   );
}

const mapStateToProps = state => ({
   usuarios: state.usuarios,
   login: state.login
})

const mapDispatchToProps = dispatch => ({
   adicionarUsuario: (usuario) => dispatch(adicionarUsuario(usuario)),
   fazerLoginDireto: (login) => dispatch(fazerLoginDireto(login))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormularioUsuario);