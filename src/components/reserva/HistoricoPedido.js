import React from 'react';
import { Link as LinkRouterDom, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
   root: {
      '& > *': {
         borderBottom: 'unset',
      },
   },
});

const HistoricoPedido = props => {
   let history = useHistory()

   if (props.login.logado === false) {
      history.push('/')
   }

   const id_usuario = props.login.id
   let reservas
   const pedidos = props.pedidos.filter(pedido => pedido.id_usuario === id_usuario)

   return (
      <TableContainer component={Paper}>
         <Table stickyHeader aria-label="collapsible table">
            <TableHead>
               <TableRow>
                  <TableCell />
                  <TableCell>Qtd. itens</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Data</TableCell>
                  <TableCell align="right">Pedido</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {pedidos.map(pedido => {
                  reservas = props.reservas.filter(reserva => reserva.numero_pedido === pedido.numero_pedido)

                  return (
                     <Linha key={pedido.numero_pedido}
                        pedido={pedido}
                        produtos={props.produtos}
                        id_usuario={id_usuario}
                        reservas={reservas} />
                  )
               })}
            </TableBody>
         </Table>
      </TableContainer>
   );
}

function Linha(props) {
   const [open, setOpen] = React.useState(false);
   const classes = useRowStyles();

   const formatar_valor = valor => {
      const formatter = new Intl.NumberFormat('pt-BR',
         { style: 'currency', currency: 'BRL' }
      );

      return formatter.format(valor)
   }

   const formatar_data = data => {
      data = new Date(data)
      
      const dia = data.getDay().toString()
      const mes = data.getMonth() + 1
      const ano = data.getFullYear()
      const hora = data.getHours()
      const minuto = data.getMinutes()
      const segundo = data.getSeconds()

      return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`
   }

   const { produtos, pedido } = props

   let reservas = props.reservas

   function montar_tabela() {
      let qtd_itens = 0
      let produto, sub_total

      const linha_tabela_reserva = reservas.map((reserva, index) => {
         produto = produtos.find(produto => produto.id === reserva.id_produto)

         if (produto === undefined) {
            return (<></>)
         }

         if (reserva.numero_pedido !== pedido.numero_pedido) {
            return (<></>)
         }

         sub_total = formatar_valor(produto.preco * reserva.quantidade)
         qtd_itens += 1

         return (
            <TableRow key={pedido.numero_pedido + index}>
               <TableCell component="th" scope="row">
                  <Link component={LinkRouterDom} to={`/produto/${produto.id}`}>{produto.nome}</Link>
               </TableCell>
               <TableCell>{formatar_valor(produto.preco)}</TableCell>
               <TableCell align="right">{reserva.quantidade}</TableCell>
               <TableCell align="right">{sub_total}</TableCell>
            </TableRow>
         )
      })

      return (
         <>
            <TableRow className={classes.root}>
               <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                     {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
               </TableCell>
               <TableCell component="th" scope="row">
                  {qtd_itens}
               </TableCell>
               <TableCell align="right">{formatar_valor(pedido.total)}</TableCell>
               <TableCell align="right">{formatar_data(pedido.data_pedido)}</TableCell>
               <TableCell align="right">{pedido.numero_pedido}</TableCell>
            </TableRow>
            <TableRow>
               <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                     <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                           Reserva
                        </Typography>
                        <Table size="small" aria-label="purchases">
                           <TableHead>
                              <TableRow>
                                 <TableCell>Nome</TableCell>
                                 <TableCell>Preco</TableCell>
                                 <TableCell align="right">Quantidade</TableCell>
                                 <TableCell align="right">Subtotal</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {linha_tabela_reserva}
                           </TableBody>
                        </Table>
                     </Box>
                  </Collapse>
               </TableCell>
            </TableRow>
         </>
      )
   }

   return (
      <React.Fragment>
         {montar_tabela()}
      </React.Fragment>
   );
}

const mapStateToProps = state => ({
   pedidos: state.pedidos,
   reservas: state.reservas,
   produtos: state.produtos,
   login: state.login
})

export default connect(mapStateToProps)(HistoricoPedido);