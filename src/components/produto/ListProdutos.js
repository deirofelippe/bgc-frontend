import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

class ListProdutos extends Component {
   render() {
      const produtos = this.props.lista
      return (
         <Tabela produtos={produtos} />
      )
   }
}

const useStyles = makeStyles({
   table: {
      minWidth: 650,
   },
});

function Tabela(props){
   const { produtos } = props
   const classes = useStyles()
   return (
      <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Preço</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {produtos.map(produto => (
                  <TableRow key={produto.id}>
                     <TableCell>
                        <Link to={() =>  "/produto/" + produto.id}>
                           {produto.nome}
                        </Link>
                     </TableCell>
                     <TableCell>{produto.descricao}</TableCell>
                     <TableCell>{produto.preco}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

export default ListProdutos;