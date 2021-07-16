import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { adicionar } from '../../redux/actions/produtoActions';
import { validar_preco } from '../../utils/validacoes';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';


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

const FormularioProduto = props => {
   const classes = useStyles();

   const estadoInicial = () => {
      return {
         id: v1(),
         nome: 'a',
         descricao: 'b',
         preco: '125',
         imagem: undefined,
      }
   }

   const [produto, setProduto] = useState(estadoInicial())
   const [msg, setMsg] = useState('')

   const handleChange = event => {
      const { name, value } = event.target
      console.log(event.target.files[0])
      setProduto({ ...produto, [name]: value })
   }

   const uploadFile = async () => {
      let formData = new FormData();
      formData.append("imagem", produto.imagem);
      formData.append("nome", produto.nome);
      formData.append("descricao", produto.descricao);
      formData.append("preco", produto.preco);

      const url = 'https://ckszbols2c.execute-api.sa-east-1.amazonaws.com/dev/produto'
      const headers = {
         "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      }

      await axios.post(url, formData, headers)
   }

   const limparCampos = () => {
      setProduto({ ...estadoInicial() })
   }

   const handleSubmit = (event) => {
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

      props.adicionar(produto)
      limparCampos()
      setMsg('Produto cadastrado.')
   }

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Typography component="h1" variant="h5">
               Cadastrar produto
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
                  onClick={handleSubmit}
               >
                  Atualizar
            </Button>
            </form>
         </div>
      </Container>
   );
}

const mapDispatchToProps = (dispatch) => ({
   adicionar: (produto) => dispatch(adicionar(produto)),
})

export default connect(() => ({}), mapDispatchToProps)(FormularioProduto);