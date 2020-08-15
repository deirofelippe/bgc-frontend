import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { adicionarUsuario } from '../../redux/actions/usuarioActions';
import { fazerLoginDireto } from '../../redux/actions/loginActions';
import { buscarCEP, verificarEmailExiste } from '../../services/usuarioService';

const AtualizacaoUsuario = props => {
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

      const emailJaExiste = verificarEmailExiste(props.usuarios, usuario.email)
      if (emailJaExiste) {
         return
      }
      const usuarioCompleto = {
         ...usuario,
         endereco: { ...endereco }
      }

      const loginUsuarioCadastrado = {
         logado: true,
         email: usuario.email,
         nome: usuario.nome,
         tipoDeUsuario: usuario.tipo
      }

      props.adicionarUsuario(usuarioCompleto)

      props.fazerLoginDireto(loginUsuarioCadastrado)

      console.log(usuarioCompleto)
      //fazer login direto, sem buscar nos usuario
      // props.adicionar(usuario)
      // limparCampos()
   }

   const login = props.login

   return (
      <form onSubmit={(event) => handleSubmit(event)}>
         <label>Nome: </label>
         <input type="text" name="nome" value={usuario.nome} onChange={handleChangeUsuario} />

         <label>E-mail: </label>
         <input type="email" name="email" value={usuario.email} onChange={handleChangeUsuario} />

         <label>Senha: </label>
         <input type="password" name="senha" value={usuario.senha} onChange={handleChangeUsuario} />

         {login.tipoDeUsuario === 'ADMIN' &&
            <>
               <label htmlFor="">Tipo de usuário: </label>
               <select name="tipo" value={usuario.tipo} onChange={handleChangeUsuario}>
                  <option value="CLIENTE" selected>Cliente</option>
                  <option value="ADMIN">Administrador</option>
               </select>
            </>
         }

         <label>CEP: </label>
         <input type="text" name="cep" value={endereco.cep} onChange={handleChangeEndereco} />
         <button onClick={handleCEP}>Buscar CEP</button>

         {cepFoiBuscado === true &&
            <>
               <h2>{endereco.estado}</h2>
               <h2>{endereco.cidade}</h2>
               <h2>{endereco.bairro}</h2>
               <h2>{endereco.endereco}</h2>
            </>
         }

         <label>Número: </label>
         <input type="text" name="numero" value={endereco.numero} onChange={handleChangeEndereco} />

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

export default connect(mapStateToProps, mapDispatchToProps)(AtualizacaoUsuario);