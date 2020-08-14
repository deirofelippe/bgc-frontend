import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletarProduto } from '../../redux/actions/produtoActions';

const ListagemProdutos = (props) => {
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
      // props.deletar(id)
   }
   
   const produtos = props.produtos
   console.log(props.estado)

   return (
      <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>#</TableCell>
                  <TableCell>#</TableCell>
                  <TableCell>#</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {produtos.map((produto) => (
                  <TableRow key={produto.id}>
                     <TableCell>
                        <Link to={`/produto/${produto.id}`}>{produto.nome}</Link>
                     </TableCell>
                     <TableCell>{produto.descricao}</TableCell>
                     <TableCell>{produto.preco}</TableCell>
                     <TableCell>
                        <Link to={`/reserva/${produto.id}`}>Comprar</Link>
                     </TableCell>
                     <TableCell>
                        <Link to={`/edit/produto/${produto.id}`}>Editar</Link>
                     </TableCell>
                     <TableCell>
                        <button onClick={() => handleDelete(produto.id)}>Deletar</button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

const mapStateToProps = state => ({
   produtos: state.produtos,
   estado: state,
})

const mapDispatchToProps = dispatch => ({
   deletar: (id) => dispatch(deletarProduto(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListagemProdutos);