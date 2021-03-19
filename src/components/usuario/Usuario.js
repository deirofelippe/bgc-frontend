import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { buscar_usuario } from '../../services/usuarioService';

const Usuario = props => {
   const { id } = useParams()
   const usuario = buscar_usuario(props.usuarios, id)
   const endereco = usuario.endereco
   const login = props.login

   return (
      <div>
         <h2>Nome: {usuario.nome}</h2>
         <h1>E-mail: {usuario.email}</h1>
         {login.tipoDeUsuario === 'ADMIN' &&
            <h2>Senha: {usuario.senha}</h2>
         }
         
         <h2>CEP: {endereco.cep}</h2>
         <h2>Estado: {endereco.estado}</h2>
         <h2>Cidade: {endereco.cidade}</h2>
         <h2>Bairro: {endereco.bairro}</h2>
         <h2>Endereço: {endereco.endereco}</h2>
         <h2>Número: {endereco.numero}</h2>
         <Link to={`/usuario/atualizacao/${login.id}`}>Atualizar</Link>
      </div>
   );
}

const mapStateToProps = (state) => ({
   usuarios: state.usuarios,
   login: state.login
})

export default connect(mapStateToProps)(Usuario);