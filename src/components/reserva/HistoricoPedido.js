import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { List, ListItem, ListItemText, Collapse, ListSubheader } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
   root: {
     width: '100%',
     maxWidth: '100%',
     backgroundColor: theme.palette.background.paper,
   },
   tabela: {
     width: '90%',
     maxWidth: '100%',
     backgroundColor: theme.palette.background.paper,
   },
   nested: {
     paddingLeft: theme.spacing(6),
   },
   h1: {
      fontSize: 30
   },
   h2: {
      fontSize: 15
   }
}));

const HistoricoPedido = props => {
   const classes = useStyles();

   const id_usuario = props.login.id

   const formatar_valor = valor => {
      const formatter = new Intl.NumberFormat('pt-BR', 
         { style: 'currency', currency: 'BRL' }
      );

      return formatter.format(valor)
   }

   const formatar_data = data => {
      data = new Date(data)
      return `${data.getDay()}/${data.getMonth()}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
   }

   return (
      <>
      <List
         component="nav"
         aria-labelledby="nested-list-subheader"
         subheader={
         <ListSubheader component="div" id="nested-list-subheader" className={classes.h1}>
            Pedidos
         </ListSubheader>
         }
         className={classes.root}
      >

         {props.pedidos.map((pedido) => {
            const reservas = props.reservas.filter(reserva => reserva.id_usuario !== id_usuario)
            let qtd_itens = 0

            const linha_tabela = reservas.map((reserva, index) => {
               const produto = props.produtos.find(produto => produto.id === reserva.id_produto)
               const sub_total = formatar_valor(produto.preco * reserva.quantidade)
               if(reserva.numero_pedido !== pedido.numero_pedido){
                  return (<></>)
               }

               qtd_itens += 1
               return (
                  <TableRow key={pedido.numero_pedido + index}>
                     <TableCell>
                        <Link to={`/produto/${produto.id}`}>{produto.nome}</Link>
                     </TableCell>
                     <TableCell>{formatar_valor(produto.preco)}</TableCell>
                     <TableCell>{reserva.quantidade}</TableCell>
                     <TableCell>{sub_total}</TableCell>
                  </TableRow>
               )
            })

            return (
               <>
                  <ListItem button>
                     <ListItemText primary={`Itens: ${qtd_itens} - Total: ${formatar_valor(pedido.total)} - 
                                             Data: ${formatar_data(pedido.data_pedido)} - 
                                             Pedido: ${pedido.numero_pedido}`} className={classes.h2} />
                  </ListItem>

                  <Collapse in={true} timeout="auto" unmountOnExit>
                     <TableContainer className={[classes.nested, classes.tabela]}>
                        <Table>
                           <TableHead>
                              <TableRow>
                                 <TableCell>Nome</TableCell>
                                 <TableCell>Preco</TableCell>
                                 <TableCell>Quantidade</TableCell>
                                 <TableCell>Subtotal</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {linha_tabela}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  </Collapse>
               </>
            )
         })}
      </List>
      </>
   );
}

const mapStateToProps = state => ({
   pedidos: state.pedidos,
   reservas: state.reservas,
   produtos: state.produtos,
   login: state.login
})

export default connect(mapStateToProps)(HistoricoPedido);