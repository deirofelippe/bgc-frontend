import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletar } from '../../redux/actions/usuarioActions';

const ListagemUsuarios = (props) => {
   const useStyles = makeStyles({
      table: {
         minWidth: 650,
      },
   });

   const classes = useStyles()

   const handleDelete = (id) => {
      if(window.confirm("Tem certeza que deseja deletar?")){
         props.deletar(id)
      }
   }
   
   const usuarios = props.usuarios
   //nome, email e tipo
   return (
      <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>#</TableCell>
                  <TableCell>#</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                     <TableCell>
                        <Link to={`/usuario/${usuario.id}`}>{usuario.nome}</Link>
                     </TableCell>
                     <TableCell>{usuario.email}</TableCell>
                     <TableCell>{usuario.tipo}</TableCell>
                     <TableCell>
                        <Link to={`/usuario/atualizacao/${usuario.id}`}>Editar</Link>
                     </TableCell>
                     <TableCell>
                        <button onClick={() => handleDelete(usuario.id)}>Deletar</button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

const mapStateToProps = state => ({
   usuarios: state.usuarios,
})

const mapDispatchToProps = dispatch => ({
   deletar: (id) => dispatch(deletar(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListagemUsuarios);