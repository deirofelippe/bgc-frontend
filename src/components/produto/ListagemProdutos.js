import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletar } from '../../redux/actions/produtoActions';
import { adicionar } from '../../redux/actions/carrinhoActions';

const ListagemProdutos = (props) => {
   const useStyles = makeStyles({
      table: {
         minWidth: 650,
      },
   });

   const classes = useStyles()

   const handleDelete = (id) => {
      if(window.confirm("Tem certeza que deseja deletar?")){
         props.deletar_produto(id)
      }
   }

   const handleSubmit = (id_produto, id_usuario) => {
      if(login.logado === false){
         alert("Faça login para reservar um produto.")
         return
      }
      props.adicionar_no_carrinho({id_produto, id_usuario})
   }

   const formatarPreco = preco => {
      const formatter = new Intl.NumberFormat('pt-BR', 
         { style: 'currency', currency: 'BRL' }
      );

      return formatter.format(preco)
   }
   
   const produtos = props.produtos
   const login = props.login

   return (
      <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>#</TableCell>
                  {login.tipo_de_usuario === 'ADMIN' &&
                     <>
                        <TableCell>#</TableCell>
                        <TableCell>#</TableCell>
                     </>
                  }
               </TableRow>
            </TableHead>
            <TableBody>
               {produtos.map((produto) => (
                  <TableRow key={produto.id}>
                     <TableCell>
                        <Link to={`/produto/${produto.id}`}>{produto.nome}</Link>
                     </TableCell>
                     <TableCell>{produto.descricao}</TableCell>
                     <TableCell>{formatarPreco(produto.preco)}</TableCell>
                     <TableCell>
                        <button onClick={() => handleSubmit(produto.id, login.id)}>Reservar</button>
                     </TableCell>
                     {login.tipo_de_usuario === 'ADMIN' &&
                        <>
                           <TableCell>
                              <Link to={`/produto/atualizacao/${produto.id}`}>Editar</Link>
                           </TableCell>
                           <TableCell>
                              <button onClick={() => handleDelete(produto.id)}>Deletar</button>
                           </TableCell>
                        </>
                     }
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

const mapStateToProps = state => ({
   produtos: state.produtos,
   login: state.login
})

const mapDispatchToProps = dispatch => ({
   deletar_produto: (id) => dispatch(deletar(id)),
   adicionar_no_carrinho: (ids) => dispatch(adicionar(ids))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListagemProdutos);