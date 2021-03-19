import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { v1 } from 'uuid';
import { deletar, incrementar, decrementar } from '../../redux/actions/carrinhoActions';
import { enviar_email, preparar_reservas, preparar_pedido } from '../../services/reservaService';
import { finalizar } from '../../redux/actions/reservaActions';
import { limpar } from '../../redux/actions/carrinhoActions';
import { adicionar } from '../../redux/actions/pedidoActions';

const CarrinhoCompra = (props) => {

   let history = useHistory()

   if(props.login.logado === false){
      history.push('/')
   }

   const id_usuario = props.login.id
   const useStyles = makeStyles({
      table: {
         minWidth: 650,
      },
   });

   const classes = useStyles()

   useEffect(() => {
      const total_formatado = formatar_valor(total)
      setTotalExibir(total_formatado)
   }, [])

   const deletar_item = (id_produto, preco, quantidade) => {
      if(window.confirm("Tem certeza que deseja deletar?")){
         props.deletar_item({id_produto, id_usuario})
         total = total - (preco * quantidade)
         setTotalExibir(formatar_valor(total))
      }
   }

   const formatar_valor = preco => {
      const formatter = new Intl.NumberFormat('pt-BR', 
         { style: 'currency', currency: 'BRL' }
      );

      return formatter.format(preco)
   }

   const incrementar_quantidade = (id_produto, preco) => {
      props.incrementar_quantidade({id_produto, id_usuario})
      setTotalExibir(formatar_valor(total + parseFloat(preco)))
   }

   const decrementar_quantidade = (id_produto, preco, quantidade) => {
      if(quantidade <= 1){
         return
      }
      props.decrementar_quantidade({id_produto, id_usuario})
      setTotalExibir(formatar_valor(total - parseFloat(preco)))
   }

   const finalizar_reserva = async () => {
      let qtd_itens_carrinho = 0
      carrinho.forEach((item) => {
         if(item.id_usuario === id_usuario){
            qtd_itens_carrinho += 1
         }
      })

      if(qtd_itens_carrinho <= 0){
         alert('Não é possivel finalizar compra com o carrinho vazio.')
         return
      }

      const numero_pedido = v1()

      const reservas = preparar_reservas(carrinho, id_usuario, numero_pedido)
      const pedido = preparar_pedido({numero_pedido, id_usuario, total})

      await props.finalizar_reserva(reservas)
      await props.adicionar_pedido(pedido)

      enviar_email(pedido, reservas, props.produtos, props.login)
      
      props.limpar_carrinho(id_usuario)
   }

   const [totalExibir, setTotalExibir] = useState(formatar_valor(0))
   const carrinho = props.carrinho
   const produtos = props.produtos
   let produto_carrinho
   let total = 0

   return (
      <>
         <h1>Total: {totalExibir}</h1>
         <button onClick={finalizar_reserva}>Finalizar Reserva</button>
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Nome</TableCell>
                     <TableCell>Preço</TableCell>
                     <TableCell>Quantidade</TableCell>
                     <TableCell>Subtotal</TableCell>
                     <TableCell>#</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {carrinho.map((item) => {
                     if(item.id_usuario !== props.login.id){
                        return (<></>)
                     }

                     produto_carrinho = produtos.find(produto => produto.id === item.id_produto)

                     const subtotal = produto_carrinho.preco * item.quantidade
                     total += subtotal
                     const preco = produto_carrinho.preco
                     const quantidade = item.quantidade
                     const id = item.id_produto
                     const nome = produto_carrinho.nome

                     return(
                        <TableRow key={item.id_produto}>
                           <TableCell>
                              <Link to={`/produto/${id}`}>{nome}</Link>
                           </TableCell>
                           <TableCell>{formatar_valor(preco)}</TableCell>
                           <TableCell>
                              <input type="text" value={quantidade} disabled />
                              <button onClick={() => incrementar_quantidade(id, preco)}>+</button>
                              <button onClick={() => decrementar_quantidade(id, preco, quantidade)}>-</button>
                           </TableCell>
                           <TableCell>
                              {formatar_valor(subtotal)}
                           </TableCell>
                           <TableCell>
                              <button onClick={() => deletar_item(id, preco, quantidade)}>Deletar</button>
                           </TableCell>
                        </TableRow>
                     )
                  })}
               </TableBody>
            </Table>
         </TableContainer>
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