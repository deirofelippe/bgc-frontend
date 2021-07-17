import React, { useState, useEffect } from 'react';
import { Link as LinkRouterDom, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { v1 } from 'uuid';
import { deletar, incrementar, decrementar } from '../../redux/actions/carrinhoActions';
import { enviar_email, preparar_reservas, preparar_pedido } from '../../services/reservaService';
import { finalizar } from '../../redux/actions/reservaActions';
import { limpar } from '../../redux/actions/carrinhoActions';
import { adicionar } from '../../redux/actions/pedidoActions';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(1),
      },
      width: '100%',
   },
   container: {
      maxHeight: 440,
   },
}))

const CarrinhoCompra = (props) => {

   let history = useHistory()

   if (props.login.logado === false) {
      history.push('/')
   }

   const id_usuario = props.login.id

   const classes = useStyles()

   let total = 0

   useEffect(() => {
      const total_formatado = formatar_valor(total)
      setTotalExibir(total_formatado)
   }, [total])

   const deletar_item = (id_produto, preco, quantidade) => {
      if (window.confirm("Tem certeza que deseja deletar?")) {
         props.deletar_item({ id_produto, id_usuario })
         total = total - (preco * quantidade)
         setTotalExibir(formatar_valor(total))
      }
   }

   const deletar_item_inexistente = (id_produto) => {
      props.deletar_item({ id_produto, id_usuario })
   }

   const formatar_valor = preco => {
      const formatter = new Intl.NumberFormat('pt-BR',
         { style: 'currency', currency: 'BRL' }
      );

      return formatter.format(preco)
   }

   const handleChange = (event, id_produto, preco, quantidade) => {
      const { value } = event.target

      if(value > quantidade){
         props.incrementar_quantidade({ id_produto, id_usuario })
         setTotalExibir(formatar_valor(total + parseFloat(preco)))
         return;
      }
      
      if (quantidade <= 1) {
         return
      }
      props.decrementar_quantidade({ id_produto, id_usuario })
      setTotalExibir(formatar_valor(total - parseFloat(preco)))
   }

   const finalizar_reserva = async () => {
      let qtd_itens_carrinho = 0
      carrinho.forEach((item) => {
         if (item.id_usuario === id_usuario) {
            qtd_itens_carrinho += 1
         }
      })

      if (qtd_itens_carrinho <= 0) {
         alert('Não é possivel finalizar compra com o carrinho vazio.')
         return
      }

      const numero_pedido = v1()

      const reservas = preparar_reservas(carrinho, id_usuario, numero_pedido)
      const pedido = preparar_pedido({ numero_pedido, id_usuario, total })

      await props.finalizar_reserva(reservas)
      await props.adicionar_pedido(pedido)

      console.log('pedido')

      const url_payment = await enviar_email(pedido, reservas, props.produtos, props.login)

      props.limpar_carrinho(id_usuario)
      setTotalExibir(formatar_valor(0))

      window.location.href = url_payment
   }

   const [totalExibir, setTotalExibir] = useState(formatar_valor(0))
   const carrinho = props.carrinho
   const produtos = props.produtos
   let produto_carrinho

   return (
      <>
         <Paper className={classes.root}>
            <div className={classes.root}>
               <Typography variant="h4" gutterBottom>
                  Total: {totalExibir}
               </Typography>
               <Button onClick={finalizar_reserva} variant="contained" color="primary">
                  Finalizar reserva
               </Button>
            </div>
            <TableContainer className={classes.container}>
               <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                     <TableRow>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Preço</TableCell>
                        <TableCell align="center">Quantidade</TableCell>
                        <TableCell align="center">Subtotal</TableCell>
                        <TableCell align="center">#</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {carrinho.map((item) => {
                        if (item.id_usuario !== props.login.id) {
                           return (<></>)
                        }

                        produto_carrinho = produtos.find(produto => produto.id === item.id_produto)

                        if (produto_carrinho === undefined) {
                           deletar_item_inexistente(item.id_produto)
                           return (<></>)
                        }

                        const subtotal = produto_carrinho.preco * item.quantidade
                        total += subtotal
                        const preco = produto_carrinho.preco
                        const quantidade = item.quantidade
                        const id = item.id_produto
                        const nome = produto_carrinho.nome

                        return (
                           <TableRow key={item.id_produto}>
                              <TableCell align="center">
                                 <Link component={LinkRouterDom} to={`/produto/${id}`}>{nome}</Link>
                              </TableCell>
                              <TableCell align="center">{formatar_valor(preco)}</TableCell>
                              <TableCell align="center">
                                 <TextField type="number" name="quantidade" value={quantidade} onChange={(event) => handleChange(event, id, preco, quantidade)} />
                              </TableCell>
                              <TableCell align="center">
                                 {formatar_valor(subtotal)}
                              </TableCell>
                              <TableCell align="center">
                                 <Link
                                    href="#"
                                    onClick={() => deletar_item(id, preco, quantidade)}
                                 ><DeleteIcon fontSize="large" /></Link>
                              </TableCell>
                           </TableRow>
                        )
                     })}
                  </TableBody>
               </Table>
            </TableContainer>
         </Paper>
      </>
   )
}

const mapStateToProps = state => ({
   carrinho: state.carrinho,
   produtos: state.produtos,
   reservas: state.reservas,
   pedidos: state.pedidos,
   login: state.login
})

const mapDispatchToProps = dispatch => ({
   deletar_item: (ids) => dispatch(deletar(ids)),
   incrementar_quantidade: (ids) => dispatch(incrementar(ids)),
   decrementar_quantidade: (ids) => dispatch(decrementar(ids)),
   limpar_carrinho: (id_usuario) => dispatch(limpar(id_usuario)),
   finalizar_reserva: (reserva) => dispatch(finalizar(reserva)),
   adicionar_pedido: (pedido) => dispatch(adicionar(pedido))
})

export default connect(mapStateToProps, mapDispatchToProps)(CarrinhoCompra);