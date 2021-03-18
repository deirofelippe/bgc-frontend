import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletar, incrementar, decrementar } from '../../redux/actions/carrinhoActions';

const CarrinhoCompra = (props) => {
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

   const handleDelete = (id) => {
      if(window.confirm("Tem certeza que deseja deletar?")){
         props.deletar_do_carrinho(id)
      }
   }

   const handleChange = (event, id) => {
      //quantidade 
      console.log(event.target)
      console.log(event.target.value)
      // props.atualizar_quantidade(id)
      // console.log(props.carrinho)
   }

   const formatar_valor = preco => {
      const formatter = new Intl.NumberFormat('pt-BR', 
         { style: 'currency', currency: 'BRL' }
      );

      return formatter.format(preco)
   }

   const incrementar_quantidade = (id_produto, preco) => {
      props.incrementar_quantidade(id_produto)
      console.log(total + preco)
      setTotalExibir(formatar_valor(total + parseFloat(preco)))
   }

   const decrementar_quantidade = (id_produto, preco, quantidade) => {
      if(quantidade <= 1){
         return
      }
      props.decrementar_quantidade(id_produto)
      setTotalExibir(formatar_valor(total - parseFloat(preco)))
   }

   const [totalExibir, setTotalExibir] = useState(formatar_valor(0))
   const carrinho = props.carrinho
   const produtos = props.produtos
   let produto_carrinho
   let total = 0

   return (
      <>
         <h1>Total: {totalExibir}</h1>
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
                     produto_carrinho = produtos.find(produto => produto.id === item.id_produto)
                     const subtotal = produto_carrinho.preco * item.quantidade
                     total += subtotal

                     return(
                        <TableRow key={item.id_produto}>
                           <TableCell>
                              <Link to={`/produto/${item.id_produto}`}>{produto_carrinho.nome}</Link>
                           </TableCell>
                           <TableCell>{formatar_valor(produto_carrinho.preco)}</TableCell>
                           <TableCell>
                              <input type="text" value={item.quantidade} disabled />
                              <button onClick={() => incrementar_quantidade(item.id_produto, produto_carrinho.preco)}>+</button>
                              <button onClick={() => decrementar_quantidade(item.id_produto, produto_carrinho.preco, item.quantidade)}>-</button>
                           </TableCell>
                           <TableCell>
                              {formatar_valor(subtotal)}
                           </TableCell>
                           <TableCell>
                              <button onClick={() => handleDelete(item.id_produto)}>Deletar</button>
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
   produtos: state.produtos
})

const mapDispatchToProps = dispatch => ({
   deletar_do_carrinho: (id_produto) => dispatch(deletar(id_produto)),
   incrementar_quantidade: (id_produto) => dispatch(incrementar(id_produto)),
   decrementar_quantidade: (id_produto) => dispatch(decrementar(id_produto))
})

export default connect(mapStateToProps, mapDispatchToProps)(CarrinhoCompra);