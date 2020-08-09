import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ListProdutos = props => {
   const useStyles = makeStyles({
      table: {
         minWidth: 650,
      },
   });
   const classes = useStyles()
   const produtos = props.lista.produtos

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
               {produtos.map((produto, indice) => (
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
                        <button onClick={() => props.handleDelete(indice)}>Deletar</button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

export default ListProdutos;