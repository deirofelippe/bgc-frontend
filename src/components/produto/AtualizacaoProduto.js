import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { atualizar } from '../../redux/actions/produtoActions';
import { buscar } from '../../services/produtoService';
import { validar_preco } from '../../utils/validacoes';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   colorError: {
      color: theme.palette.error.dark
   },
   inputBorderColor: {
      borderColor: theme.palette.error.dark
   },
}));

const EditProduto = props => {
   const classes = useStyles();
   const { id } = useParams()
   let history = useHistory()

   const [msg, setMsg] = useState('')

   const iniciarEstado = () => {
      return buscar(props.produtos, id)
   }

   const [produto, setProduto] = useState(iniciarEstado)

   const handleChange = event => {
      const { name, value } = event.target
      setProduto({ ...produto, [name]: value })
   }

   const handleUpdate = (event) => {
      event.preventDefault()
      if (!validar_preco(produto.preco)) {
         setMsg('Digite um preço válido')
         return
      }
      let preco = produto.preco.toString()
      preco = preco.replace(',', '.')
      preco = parseFloat(preco)
      preco = preco.toFixed(2)
      produto.preco = preco

      if (produto.nome === '') {
         setMsg('Digite o nome do produto')
         return
      }

      props.atualizar(produto)
      history.push('/')
   }

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Typography component="h1" variant="h5">
               Atualizar produto
            </Typography>
            <Typography variant="body2" className={classes.colorError} align="center">
               {msg}
            </Typography>
            <form
               className={classes.form}
               noValidate
            >

               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  name="nome"
                  autoComplete="nome"
                  autoFocus
                  className={classes.inputColor}
                  value={produto.nome}
                  onChange={handleChange}
               />
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="descricao"
                  label="Descrição"
                  name="descricao"
                  autoComplete="descricao"
                  autoFocus
                  className={classes.inputColor}
                  value={produto.descricao}
                  onChange={handleChange}
               />
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="preco"
                  label="Preço"
                  name="preco"
                  autoComplete="preco"
                  autoFocus
                  className={classes.inputColor}
                  value={produto.preco}
                  onChange={handleChange}
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleUpdate}
               >
                  Atualizar
            </Button>
            </form>
         </div>
      </Container>
   );
}

const mapStateToProps = state => ({
   produtos: state.produtos,
})

const mapDispatchToProps = dispatch => ({
   atualizar: (produto) => dispatch(atualizar(produto)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduto);