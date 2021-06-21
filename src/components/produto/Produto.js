import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { buscar } from '../../services/produtoService';
import { adicionar } from '../../redux/actions/carrinhoActions';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      margin: '10px',
   },
   details: {
      display: 'flex',
      flexDirection: 'column',
   },
   content: {
      flex: '1 0 auto',
   },
   cover: {
      width: 300,
      height: 300,
   },
   controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
   },
   playIcon: {
      height: 40,
      width: 40,
   },
}));

const Produto = props => {
   const classes = useStyles();

   const { id } = useParams()
   const produto = buscar(props.produtos, id)
   const login = props.login
   const { enqueueSnackbar } = useSnackbar();

   const handleSubmit = (id_produto, id_usuario) => {
      if (login.logado === false) {
         alert("Faça login para reservar um produto.")
         return
      }
      props.adicionar_no_carrinho({ id_produto, id_usuario })
      enqueueSnackbar('Item adicionado no carrinho',
         {
            variant: 'info',
            autoHideDuration: 1000,
         })
   }

   const formatarPreco = preco => {
      const formatter = new Intl.NumberFormat('pt-BR',
         { style: 'currency', currency: 'BRL' }
      );

      return formatter.format(preco)
   }

   return (
      <Card className={classes.root}>
         <CardMedia
            className={classes.cover}
            image="https://source.unsplash.com/random"
            title="Live from space album cover"
         />

         <div className={classes.details}>
            <CardContent className={classes.content}>
               <Typography component="h5" variant="h5">
                  {produto.nome}
               </Typography>
               <Typography variant="subtitle1" color="textSecondary">
                  {produto.descricao}
               </Typography>
               <Typography component="h5" variant="h5">
                  {formatarPreco(produto.preco)}
               </Typography>
            </CardContent>
            <div className={classes.controls}>
               {login.logado === true
                  ? 
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => handleSubmit(produto.id, login.id)}
                     >
                        Reservar
                     </Button>
                  : 
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        href="/login"
                     >
                        Faça login para reservar o produto
                     </Button>
               }
            </div>
         </div>
      </Card>
   );
}

const mapStateToProps = state => ({
   produtos: state.produtos,
   login: state.login
})

const mapDispatchToProps = dispatch => ({
   adicionar_no_carrinho: (ids) => dispatch(adicionar(ids))
})

export default connect(mapStateToProps, mapDispatchToProps)(Produto);