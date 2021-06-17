import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deletar } from '../../redux/actions/usuarioActions';
import { Link as LinkRouterDom } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
   root: {
      width: '100%',
   },
   container: {
      maxHeight: 440,
   },
});

const ListagemUsuarios = (props) => {
   const classes = useStyles();
   const [pagina, setPagina] = useState(0);
   const [linhasPorPagina, setLinhasPorPagina] = useState(10);

   const handleChangePagina = (event, nova_pagina) => {
      setPagina(nova_pagina);
   };

   const handleChangeLinharPorPagina = (event) => {
      setLinhasPorPagina(+event.target.value);
      setPagina(0);
   };

   const handleDelete = (id) => {
      if (window.confirm("Tem certeza que deseja deletar?")) {
         props.deletar(id)
      }
   }

   const usuarios = props.usuarios
   const total_usuarios = usuarios.length

   return (
      <Paper className={classes.root}>
         <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
               <TableHead>
                  <TableRow>
                     <TableCell align="center">Nome</TableCell>
                     <TableCell align="center">E-mail</TableCell>
                     <TableCell align="center">Tipo</TableCell>
                     <TableCell align="center">#</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {usuarios.slice(pagina * linhasPorPagina, pagina * linhasPorPagina + linhasPorPagina).map((usuario) => {
                     return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={usuarios.id}>
                           <TableCell align="center">
                              <Link variant="body2" component={LinkRouterDom} to={`/usuario/${usuario.id}`}>{usuario.nome}</Link>
                           </TableCell>
                           <TableCell align="center">{usuario.email}</TableCell>
                           <TableCell align="center">{usuario.tipo_de_usuario}</TableCell>
                           <TableCell align="center">
                              <Link
                                 href="#"
                                 onClick={() => handleDelete(usuario.id)}
                              ><DeleteIcon /></Link>
                              <Link
                                 component={LinkRouterDom}
                                 to={`/usuario/atualizacao/${usuario.id}`}
                              ><EditIcon /></Link>
                           </TableCell>
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
         <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={total_usuarios}
            rowsPerPage={linhasPorPagina}
            page={pagina}
            onChangePage={handleChangePagina}
            onChangeRowsPerPage={handleChangeLinharPorPagina}
         />
      </Paper>
   )
}

const mapStateToProps = state => ({
   usuarios: state.usuarios,
})

const mapDispatchToProps = dispatch => ({
   deletar: (id) => dispatch(deletar(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListagemUsuarios);