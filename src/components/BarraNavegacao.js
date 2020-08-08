import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   root: {
      '& > * + *': {
         marginLeft: theme.spacing(2),
      },
   },
}));

function BarraNavegacao() {
   const classes = useStyles();

   return (
      <Typography className={classes.root}>
         <Link to="/">
            Listar Produtos
         </Link>
         <Link to="/produto/form">
            Cadastrar Produto
         </Link>
      </Typography>
   );
}

export default BarraNavegacao;