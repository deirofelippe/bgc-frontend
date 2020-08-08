import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

class ListProdutos extends Component {
   constructor(props) {
      super(props);
      this.state = {
         produtos: [
            { "id": "1", "nome": "Notebook", "descricao": "a", "preco": "5000", },
            { "id": "2", "nome": "Videogame", "descricao": "b", "preco": "6000", },
            { "id": "3", "nome": "Monitor", "descricao": "c", "preco": "3000", },
            { "id": "4", "nome": "Meri", "descricao": "d", "preco": "2000", },
         ]
      }
   }

   render() {
      const { produtos } = this.state
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
                     <TableCell>{produto.nome}</TableCell>
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