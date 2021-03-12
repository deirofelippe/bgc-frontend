import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { buscarHistorico } from '../../services/reservaService';

const HistoricoReserva = props => {
   const useStyles = makeStyles({
      table: {
         minWidth: 650,
      },
   });

   const classes = useStyles()

   const login = props.login

   const [historico, setHistorico] = useState(buscarHistorico(
      login.id,
      props.reservas,
      props.produtos
   ))

   console.log(historico)

   return (
      <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Produto</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Numero da reserva</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {historico.map((item) => (
                  <TableRow key={item.reserva.numero}>
                     <TableCell>
                        <Link to={`/produto/${item.produto.id}`}>{item.produto.nome}</Link>
                     </TableCell>
                     <TableCell>{item.reserva.quantidade}</TableCell>
                     <TableCell>{login.nome}</TableCell>
                     <TableCell>{item.reserva.numero}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}

const mapStateToProps = state => ({
   produtos: state.produtos,
   reservas: state.reservas,
   login: state.login
})

export default connect(mapStateToProps)(HistoricoReserva);