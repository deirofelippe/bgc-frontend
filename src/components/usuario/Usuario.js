import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { buscarUsuario } from '../../services/usuarioService';

const Usuario = props => {
   const { id } = useParams()
   const usuario = buscarUsuario(props.usuarios, id)
   const endereco = usuario.endereco

   return (
      <div>
         <h2>{usuario.nome}</h2>
         <h1>{usuario.email}</h1>
         
         <h2>{endereco.cep}</h2>
         <h2>{endereco.estado}</h2>
         <h2>{endereco.cidade}</h2>
         <h2>{endereco.bairro}</h2>
         <h2>{endereco.endereco}</h2>
         <h2>{endereco.numero}</h2>
      </div>
   );
}

const mapStateToProps = (state) => ({
   usuarios: state.usuarios
})

export default connect(mapStateToProps)(Usuario);